import { client } from '../../../api/client';

export const deleteHistory = async (endpoint: string) => {
  const { data } = await client.delete(endpoint);

  return data;
};
