import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const setAuthorizationHeader = (token: string): void => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = (): void => {
  delete client.defaults.headers.common['Authorization'];
};
