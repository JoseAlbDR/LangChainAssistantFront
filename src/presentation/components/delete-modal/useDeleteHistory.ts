import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHistory } from './service';
import { AxiosError } from 'axios';

interface DeleteHistoryArgs {
  deleteMessages: () => void;
  onClose: () => void;
  to: string;
}

export const useDeleteHistory = ({
  deleteMessages,
  onClose,
  to,
}: DeleteHistoryArgs) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: string) => deleteHistory(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['chatbotHistory'],
      });
      toast.success(data.message);

      deleteMessages();
      navigate(to);
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate('/login');
      }
      toast.error(error.message);
    },
  });

  return { mutate };
};
