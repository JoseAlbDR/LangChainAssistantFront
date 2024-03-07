import { useQuery } from '@tanstack/react-query';
import { getDocuments } from './service';
import { toast } from 'react-toastify';

export const configQuery = () => {
  return {
    queryKey: ['config'],
    queryFn: async () => getDocuments(),
    onError: (error: string) => {
      toast.error(error);
    },
  };
};

export const useDocuments = () => {
  const { data, isLoading, isError } = useQuery(configQuery());

  return { data, isLoading, isError };
};
