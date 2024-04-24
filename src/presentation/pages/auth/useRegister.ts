import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterUserType } from '../../../utils';
import { registerUser } from './service';
import { toast } from 'react-toastify';
import { UseFormReset } from 'react-hook-form';

export const useRegister = (
  reset: UseFormReset<{
    email: string;
    password: string;
    username: string;
    repeatPassword: string;
  }>
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterUserType) => registerUser(data),
    onSuccess: () => {
      toast.success('Usuario registrado');
      queryClient.removeQueries();
      reset();
      navigate('/login');
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
};
