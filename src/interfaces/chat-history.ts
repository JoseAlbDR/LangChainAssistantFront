export interface ChatHistory {
  _id: string;
  sessionId: string;
  messages: HistoryMessage[];
}

export interface HistoryMessage {
  type: string;
  data: {
    content: string;
    additional_kwargs: never;
  };
}
