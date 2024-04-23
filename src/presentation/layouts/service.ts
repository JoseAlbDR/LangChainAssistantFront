import { client } from '../../api/client';

export const getDocuments = async () => {
  const { data } = await client.get('/document');

  return data;
};

export const getConfig = async () => {
  const { data } = await client.get('/openai-config');

  return data;
};

export const getAuthStatus = async () => {
  const { data } = await client.get('/auth/check-status');

  return data;
};
