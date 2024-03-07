import { createContext, useCallback, useContext, useState } from 'react';

export interface Message {
  text: string;
  isGpt: boolean;
}

interface ChatContextValues {
  messages: Message[];
  saveMessage: (message: Message) => void;
  saveStream: (chunk: string) => void;
  emptyMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextValues | undefined>(undefined);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const emptyMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const saveMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const saveStream = (chunk: string) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1].text = chunk;
      return newMessages;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        saveMessage,
        saveStream,
        emptyMessages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error('Chat context was used outside of ChatProvider');

  return context;
};

export { ChatProvider, useChatContext };
