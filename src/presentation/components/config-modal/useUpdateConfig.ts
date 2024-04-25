import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateConfig } from './service';
import { ConfigType } from '../../../utils';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useUpdateConfig = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ConfigType) => updateConfig(data),
    onSuccess: () => {
      toast.success('Configuracion actualizada');
      queryClient.invalidateQueries({
        queryKey: ['config'],
      });
      onClose();
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate('/login');
      }
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
