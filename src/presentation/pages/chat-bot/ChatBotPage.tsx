import { useEffect, useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { Message } from '../../../context/ChatContext';
import { useScroll } from '../../../hooks/useScroll';
import { QueryClient } from '@tanstack/react-query';
import { historyQuery, useHistory } from './useHistory';
import { Spinner } from '@nextui-org/react';
import { mapChatHistory } from '../../../utils';

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(historyQuery());
  return null;
};

const ChatBotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatHistory, isFetching: isLoadingHistory } = useHistory();
  const { messagesEndRef } = useScroll(messages);

  useEffect(() => {
    if (!isLoadingHistory && chatHistory) {
      const history = mapChatHistory(chatHistory);

      setMessages(history);
    }
  }, [chatHistory, isLoadingHistory]);

  if (isLoadingHistory) {
    return <Spinner />;
  }

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const stream = chatStreamGeneratorUseCase(
      {
        question: text,
      },
      'chatgpt/user-question'
    );

    setIsLoading(false);

    setMessages((prev) => [...prev, { text: '', isGpt: true }]);
    for await (const chunk of stream) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = chunk;
        return newMessages;
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola! Soy tu asistente personal, pregunta lo que necesites y responderé basado en mi base de conocimiento" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <UserMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        disableCorrections
      />
    </div>
  );
};

export default ChatBotPage;
