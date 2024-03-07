import { useQuery } from '@tanstack/react-query';
import { getHistory } from './service';
import { toast } from 'react-toastify';
import { ChatHistory } from '../../../interfaces';

export const historyQuery = () => {
  return {
    queryKey: ['chatbotHistory'],
    queryFn: async () => getHistory(),
    staleTime: 1000,
    onError: (error: string) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useHistory = () => {
  const { data, isError, isFetching } = useQuery<ChatHistory>(historyQuery());

  return { data, isFetching, isError };
};
