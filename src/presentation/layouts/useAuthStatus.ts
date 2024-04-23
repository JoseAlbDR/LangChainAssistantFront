import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from './service';

export const authStatusQuery = () => {
  return {
    queryKey: ['user'],
    queryFn: getAuthStatus,
    retry: false,
  };
};

export const useAuthStatus = () => {
  const { data, isPending } = useQuery(authStatusQuery());

  return { data, isPending };
};
