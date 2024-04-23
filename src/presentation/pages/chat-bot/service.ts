import { client } from '../../../api/client';

export const getHistory = async () => {
  try {
    const { data } = await client.get('/chatgpt/chat-history');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
