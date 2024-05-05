import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginUserType, loginUserSchema } from '../../../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spinner } from '@nextui-org/react';

import useDarkMode from 'use-dark-mode';
import { ThemeSwitcher } from '../../components/theme-switcher/ThemeSwitcher';

import { useLogin } from './useLogin';

const LoginPage = () => {
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

  const { mutate, isPending } = useLogin(reset);

  const onSubmit: SubmitHandler<LoginUserType> = (data) => {
    mutate(data);
  };

  return (
    <main
      className={`${
        darkMode.value ? 'dark' : ''
      } text-foreground bg-background flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen bg-opacity-80`}
    >
      <div className="w-full bg-black bg-opacity-15 rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
              Haz Login
            </h1>
            <ThemeSwitcher />
          </div>
          <form
            className="space-y-4 md:space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Usuario"
              className=" text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              variant="faded"
              disabled={isPending}
              {...register('username')}
            />
            {errors.username && (
              <span className="block w-full mt-0 px-2.5 text-red-500">
                {errors.username.message}
              </span>
            )}
            <Input
              label="Password"
              className=" text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              variant="faded"
              disabled={isPending}
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <span className="block w-full mt-0 px-2.5 text-red-500">
                {errors.password.message}
              </span>
            )}
            <Button
              type="submit"
              variant="solid"
              className="w-full bg-background hover:bg-background focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : 'Entrar'}
            </Button>
            <p className="text-sm font-light text-gray-500">
              ¿Aún no tienes una cuenta?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline "
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
