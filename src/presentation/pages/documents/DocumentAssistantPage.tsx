import { useEffect, useState } from 'react';
import { GptMessage, UserMessage, TextMessageBoxFile } from '../../components';
import { Message } from '../../../context/ChatContext';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { useScroll } from '../../../hooks/useScroll';
import { QueryClient } from '@tanstack/react-query';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import { documentHistoryQuery, useDocumentHistory } from './useDocumentHistory';
import { mapChatHistory } from '../../../utils';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';

export const loader =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { params } = data;

    if (!params.name) return;

    await queryClient.ensureQueryData(documentHistoryQuery(params.name));

    return params.name;
  };

const DocumentAssistantPage = () => {
  const document = useLoaderData() as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatHistory, isFetching } = useDocumentHistory(document);
  const { messagesEndRef } = useScroll(messages, isFetching);

  useEffect(() => {
    if (chatHistory) {
      const history = mapChatHistory(chatHistory);
      setMessages(history);
    }
  }, [chatHistory]);

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  const handlePost = async (text: string, document: string) => {
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
      const stream = chatStreamGeneratorUseCase(
        {
          document,
          question: text,
        },
        'assistant/user-question'
      );

      setMessages((prev) => [...prev, { text: '', isGpt: true }]);

      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = chunk;
          return newMessages;
        });
      }
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
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
            <GptMessage
              text={`Hola! soy tu Chat Bot, ¿Qué necesitas saber sobre el documento ${document}?`}
            />
            {messages.map((message, index) =>
              message.isGpt ? (
                <GptMessage key={index} text={message.text} />
              ) : (
                <UserMessage key={index} text={message.text} />
              )
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        onDeleteMessages={handleDeleteMessages}
        placeholder="Escribe aquí tu pregunta"
        disableCorrections
      />
    </div>
  );
};

export default DocumentAssistantPage;
