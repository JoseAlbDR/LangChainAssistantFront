import { client } from '../../../api/client';
import { authorize } from '../../../utils';

export const getHistory = async () => {
  authorize();
  const { data } = await client.get('/chatgpt/chat-history');

  return data;
};
