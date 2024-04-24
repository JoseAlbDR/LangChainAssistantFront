import { client } from '../../../api/client';

export const getDocumentHistory = async <T>(document: string) => {
  const { data } = await client.get<T>(`/assistant/chat-history/${document}`);

  return data;
};

export const deleteDocument = async <T>(id: string, onClose: () => void) => {
  await client.delete<T>(`/document/${id}`);

  return onClose;
};
