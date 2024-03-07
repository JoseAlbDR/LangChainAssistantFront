import { useCallback, useEffect, useRef, useState } from 'react';
import { Message } from '../context/ChatContext';

export const useScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldScroll, setShouldScroll] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && shouldScroll) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    scrollToBottom();
  }, [messages, isInitialLoad, shouldScroll, scrollToBottom]);

  return { messagesEndRef, setShouldScroll };
};
