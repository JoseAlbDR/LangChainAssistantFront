import { useQuery } from '@tanstack/react-query';
import { getDocuments } from './service';
import { toast } from 'react-toastify';

interface Document {
  name: string;
  id: string;
}

export const documentsQuery = () => {
  return {
    queryKey: ['documents'],
    queryFn: getDocuments,
    retry: false,
    onError: (error: string) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useDocuments = () => {
  const { data, isFetching, isError } = useQuery<Document[]>(documentsQuery());

  return { data, isFetching, isError };
};
