import axios from 'axios';

export const getDocuments = async () => {
  const { data } = await axios.get('http://localhost:3000/api/document');

  return data;
};

export const getConfig = async () => {
  const { data } = await axios.get('http://localhost:3000/api/openai-config');

  return data;
};

export const getAuthStatus = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/api/auth/check-status'
  );

  return data;
};
