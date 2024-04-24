import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './service';
import { LoginUserType } from '../../../utils';
import { toast } from 'react-toastify';
import { setAuthorizationHeader } from '../../../api/client';
import { storage } from '../../../utils/storage';

export const useLogin = (
  reset: UseFormReset<{ username: string; password: string }>
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginUserType) => loginUser(data),
    onSuccess: (data) => {
      if (!data.isActive) {
        toast.error('El usuario no está activo');
        return navigate('/login');
      }
      toast.success('Usuario logueado');
      storage.set('accessToken', data.token);
      setAuthorizationHeader(data.token);
      queryClient.removeQueries();
      reset();
      navigate('/');
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
};
