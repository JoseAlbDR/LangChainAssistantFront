import { useQuery } from '@tanstack/react-query';
import { getHistory } from './service';
import { ChatHistory } from '../../../interfaces';

export const historyQuery = () => {
  return {
    queryKey: ['chatbot-history'],
    queryFn: async () => getHistory(),
    staleTime: 1000,
    retry: false,
  };
};

export const useHistory = () => {
  const { data, isError, isFetching } = useQuery<ChatHistory>(historyQuery());

  return { data, isFetching, isError };
};
