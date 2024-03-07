import { useEffect, useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { Message } from '../../../context/ChatContext';
import { useLoaderData } from 'react-router-dom';
import { mapChatHistory } from '../../../utils';
import { useScroll } from '../../../hooks/useScroll';

export const loader = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/chatgpt/chat-history'
    );

    if (!response.ok) throw new Error(await response.json());

    const history = await response.json();

    const chatHistory =
      history.length === 0 ? history : mapChatHistory(history);

    return chatHistory;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const ChatBotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatHistory = useLoaderData() as Message[];
  const { messagesEndRef } = useScroll(messages);

  useEffect(() => {
    setMessages(chatHistory);
  }, [chatHistory]);

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
