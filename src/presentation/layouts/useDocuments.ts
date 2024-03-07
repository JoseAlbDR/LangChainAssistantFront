import { useQuery } from '@tanstack/react-query';
import { getDocuments } from './service';
import { toast } from 'react-toastify';

export const documentsQuery = () => {
  return {
    queryKey: ['documents'],
    queryFn: async () => getDocuments(),
    onError: (error: string) => {
      toast.error(error);
    },
  };
};

export const useDocuments = () => {
  const { data, isLoading, isError } = useQuery(documentsQuery());

  console.log({ data });

  return { data, isLoading, isError };
};
