import { useEffect, useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { Message } from '../../../context/ChatContext';

import { QueryClient } from '@tanstack/react-query';
import { historyQuery, useHistory } from './useHistory';
import { mapChatHistory } from '../../../utils';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';
import { useScroll } from '../../../hooks/useScroll';
import { AxiosError } from 'axios';
import { CustomError } from '../error/customError';
import { useNavigate } from 'react-router-dom';

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData(historyQuery());
    return null;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    return null;
  }
};

const ChatBotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatHistory, isFetching } = useHistory();
  const { messagesEndRef } = useScroll(messages, isFetching);
  const navigate = useNavigate();

  useEffect(() => {
    setMessages([]);
    const history = mapChatHistory(chatHistory!);
    setMessages(history);
  }, [chatHistory, setMessages]);

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
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
    } catch (error) {
      console.log(error);
      if (typeof error === 'string') return toast.error(error);
      if (error instanceof CustomError && error.statusCode === 401)
        return navigate('/login');
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <div className="chat-container bg-primary bg-opacity-15">
      <div className="chat-messages">
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text="Hola! Soy tu asistente personal, pregunta lo que necesites y responderé basado en mi base de conocimiento." />

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
        )}
      </div>

      <TextMessageBox
        onDeleteMessages={handleDeleteMessages}
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        disableCorrections
      />
    </div>
  );
};

export default ChatBotPage;
