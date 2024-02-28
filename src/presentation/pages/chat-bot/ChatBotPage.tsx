import { useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBoxFile,
} from '../../components';

export interface Message {
  text: string;
  isGpt: boolean;
}

const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    //TODO: UseCase

    setIsLoading(false);

    //TODO: Add message isGpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola! soy tu Chat Bot, para empezar adjuta el documento sobre el cual quieres hablar, ten en cuenta que según el tamaño del documento el tiempo de carga puede variar." />

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

export default ChatTemplate;
