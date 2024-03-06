import { useEffect } from 'react';
import { GptMessage, UserMessage, TextMessageBoxFile } from '../../components';
import { toast } from 'react-toastify';
import { useChatContext } from '../../../context/ChatContext';
import { useDocumentsContext } from '../../../context/DocumentsContext';
import { chatStreamGeneratorUseCase } from '../../../core/use-cases/chat-stream-generator/chat-stream-generator.use-case';
import { useScroll } from '../../../hooks/useScroll';

const DocumentAssistantPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const { documentName } = useDocumentsContext();
  const { messages, saveMessage, saveStream, emptyMessages } = useChatContext();
  const { messagesEndRef } = useScroll(messages);

  useEffect(() => {
    if (documentName) {
      emptyMessages();
      saveMessage({
        isGpt: true,
        text: `¿Sobre qué te gustaría hablar del documento ${documentName}`,
      });
    }
  }, [documentName, saveMessage, emptyMessages]);

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
