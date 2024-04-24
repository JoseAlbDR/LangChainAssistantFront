import { client } from '../../api/client';
import { authorize } from '../../utils';

export const getDocuments = async () => {
  authorize();
  const { data } = await client.get('/document');

  return data;
};

export const getConfig = async () => {
  authorize();
  const { data } = await client.get('/openai-config');

  return data;
};

export const getAuthStatus = async () => {
  authorize();
  const { data } = await client.get('/auth/check-status');

  return data;
};
