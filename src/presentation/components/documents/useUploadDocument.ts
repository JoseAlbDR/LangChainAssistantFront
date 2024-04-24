import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { documentUpload } from './service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface UploadDocumentArgs {
  file: File;
  chunkSize: number;
  chunkOverlap: number;
}

export const useUploadDocument = (
  onClose: () => void,
  documentName: string
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UploadDocumentArgs) => documentUpload(data),
    onSuccess: () => {
      toast.success('Carga realizada con éxito!');
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      console.log();
      navigate(`/assistant/${documentName}`);
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
