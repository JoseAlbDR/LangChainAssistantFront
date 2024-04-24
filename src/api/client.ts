import axios from 'axios';
import { toast } from 'react-toastify';
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

    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.msg ||
        error.message ||
        'Error en la solicitud';

      toast(errorMessage);
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request);
    } else {
      console.error('Error:', error.message);
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
