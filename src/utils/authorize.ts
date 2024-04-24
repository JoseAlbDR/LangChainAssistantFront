import { setAuthorizationHeader } from '../api/client';
import { storage } from './storage';

export const authorize = () => {
  const accessToken = storage.get('accessToken');
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};
