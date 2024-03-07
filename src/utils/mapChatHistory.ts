import { ChatHistory, HistoryMessage } from '../interfaces';

export const mapChatHistory = (history: ChatHistory) => {
  console.log(history);

  return history.messages.map((message: HistoryMessage) => {
    if (message.type === 'ai')
      return {
        isGpt: true,
        text: message.data.content,
      };

    return {
      isGpt: false,
      text: message.data.content,
    };
  });
};
