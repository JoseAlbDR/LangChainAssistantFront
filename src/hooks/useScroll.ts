import { useEffect, useRef } from 'react';
import { Message } from '../context/ChatContext';

export const useScroll = (messages: Message[], isFetching: boolean) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (type: 'instant' | 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior: type });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages]);

  useEffect(() => {
    if (!isFetching) {
      scrollToBottom('instant');
    }
  }, [isFetching]);

  return { messagesEndRef };
};
