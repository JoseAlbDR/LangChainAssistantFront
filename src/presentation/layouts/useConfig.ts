import { useQuery } from '@tanstack/react-query';
import { getConfig } from './service';
import { toast } from 'react-toastify';

export interface Config {
  config: {
    modelName: string;
    temperature: number;
    maxTokens: number;
  };
  isKeyPresent: boolean;
}

export const configQuery = () => {
  return {
    queryKey: ['config'],
    queryFn: getConfig,
    retry: false,
    onError: (error: string) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useConfig = () => {
  const { data, isFetching, isError } = useQuery<Config>(configQuery());

  return { data, isFetching, isError };
};
