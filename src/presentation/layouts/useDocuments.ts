import { useQuery } from '@tanstack/react-query';
import { getDocuments } from './service';
import { toast } from 'react-toastify';

interface Document {
  name: string;
}

export const documentsQuery = () => {
  return {
    queryKey: ['documents'],
    queryFn: async () => getDocuments(),
    onError: (error: string) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useDocuments = () => {
  const { data, isFetching, isError } = useQuery<Document>(documentsQuery());

  return { data, isFetching, isError };
};
