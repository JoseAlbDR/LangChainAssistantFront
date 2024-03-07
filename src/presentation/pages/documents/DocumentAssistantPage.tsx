import { useEffect, useRef } from 'react';
import { GptMessage, UserMessage, TextMessageBoxFile } from '../../components';
import { toast } from 'react-toastify';
import { useChatContext } from '../../../context/ChatContext';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { useScroll } from '../../../hooks/useScroll';
import { QueryClient } from '@tanstack/react-query';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import { documentHistoryQuery, useDocumentHistory } from './useDocumentHistory';
import { mapChatHistory } from '../../../utils';

export const loader =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { params } = data;

    if (!params.name) return;

    await queryClient.ensureQueryData(documentHistoryQuery(params.name));

    return params.name;
  };

const DocumentAssistantPage = () => {
  const { messages, saveMessage, saveStream, setMessages } = useChatContext();
  const { messagesEndRef, setShouldScroll } = useScroll(messages);
  const containerRef = useRef<HTMLDivElement>(null);

  const document = useLoaderData() as string;

  const { data: chatHistory, isFetching: isLoadingHistory } =
    useDocumentHistory(document);

  useEffect(() => {
    if (!isLoadingHistory && chatHistory) {
      const history = mapChatHistory(chatHistory);
      setMessages(history);
      setShouldScroll(true);
    }

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoadingHistory, setShouldScroll, setMessages]);

  const handlePost = async (text: string, document: string) => {
    try {
      saveMessage({ text, isGpt: false });

      const stream = chatStreamGeneratorUseCase(
        {
          document,
          question: text,
        },
        'assistant/user-question'
      );

      saveMessage({ text: '', isGpt: true });

      for await (const chunk of stream) {
        saveStream(chunk);
      }
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola! soy tu Chat Bot, para empezar adjunta el documento sobre el cual quieres hablar, ten en cuenta que según el tamaño del documento el tiempo de carga puede variar." />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <UserMessage key={index} text={message.text} />
            )
          )}
          {/* 
          {isLoading && (
            <div className="col-start-3 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )} */}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        // accept=".pdf, .txt"
        disableCorrections
      />
    </div>
  );
};

export default DocumentAssistantPage;
