import { toast } from 'react-toastify';
import { getDocumentHistory } from './service';
import { useQuery } from '@tanstack/react-query';
import { ChatHistory } from '../../../interfaces';

export const documentHistoryQuery = (document: string) => {
  return {
    queryKey: ['documentHistory', document],
    queryFn: async () => getDocumentHistory(document),
    staleTime: 1000,
    onError: (error: string) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useDocumentHistory = (document: string) => {
  const { data, isError, isFetching } = useQuery<ChatHistory>(
    documentHistoryQuery(document)
  );

  return { data, isFetching, isError };
};
