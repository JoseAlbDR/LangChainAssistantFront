import axios from 'axios';
import { storage } from '../utils/storage';

export const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status && error.response.status === 401) {
      storage.remove('accessToken');
    }

    return Promise.reject(error);
  }
);

export const setAuthorizationHeader = (token: string): void => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = (): void => {
  delete client.defaults.headers.common['Authorization'];
};
