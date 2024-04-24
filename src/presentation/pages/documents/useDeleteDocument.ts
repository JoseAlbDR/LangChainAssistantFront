import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocument } from './service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, onClose }: { id: string; onClose: () => void }) =>
      deleteDocument(id, onClose),
    onSuccess: (onClose: () => void) => {
      toast.success(`Documento borrado`);
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      navigate('/documents');
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate('/login');
      }
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
