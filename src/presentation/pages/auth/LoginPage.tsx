import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUserType, loginUserSchema } from '../../../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spinner } from '@nextui-org/react';
import { loginUser } from './service';
import { toast } from 'react-toastify';
import { setAuthorizationHeader } from '../../../api/client';
import useDarkMode from 'use-dark-mode';
import { ThemeSwitcher } from '../../components/theme-switcher/ThemeSwitcher';
import { storage } from '../../../utils/storage';

const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const darkMode = useDarkMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginUserType) => loginUser(data),
    onSuccess: (data) => {
      toast.success('Usuario logueado');
      setAuthorizationHeader(data.token);
      storage.set('accessToken', data.token);
      queryClient.removeQueries();
      reset();
      navigate('/');
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit: SubmitHandler<LoginUserType> = (data) => {
    mutate(data);
  };

  return (
    <main
      className={`${
        darkMode.value ? 'dark' : ''
      } text-foreground bg-background flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`}
    >
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Haz Login
            </h1>
            <ThemeSwitcher />
          </div>
          <form
            className="space-y-4 md:space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register('username')}
              label="Usuario"
              className=" text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              disabled={isPending}
            />
            {errors.username && (
              <span className="block w-full mt-0 px-2.5 text-red-500">
                {errors.username.message}
              </span>
            )}
            <Input
              {...register('password')}
              label="Password"
              className=" text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              disabled={isPending}
              type="password"
            />
            {errors.password && (
              <span className="block w-full mt-0 px-2.5 text-red-500">
                {errors.password.message}
              </span>
            )}
            <Button
              type="submit"
              variant="solid"
              className="w-full text-white bg-tertiary-400 hover:bg-tertiary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : 'Crear Cuenta'}
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Aún no tienes una cuenta?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Registrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
