import { useEffect, useRef, useState } from 'react';
import { GptMessage, UserMessage, TextMessageBoxFile } from '../../components';
import { chatBotStreamGeneratorUseCase } from '../../../core/use-cases/chat-bot/chat-bot-stream-generator.use-case';
import { toast } from 'react-toastify';

export interface Message {
  text: string;
  isGpt: boolean;
}

const ChatBotPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePost = async (text: string, document: string) => {
    try {
      setMessages((prev) => [...prev, { text, isGpt: false }]);

      const stream = chatBotStreamGeneratorUseCase({
        document,
        question: text,
      });

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
        setMessages={setMessages}
        disableCorrections
      />
    </div>
  );
};

export default ChatBotPage;
