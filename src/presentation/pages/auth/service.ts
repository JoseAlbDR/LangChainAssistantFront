import { AxiosError } from 'axios';
import { client } from '../../../api/client';
import { LoginUserType, RegisterUserType } from '../../../utils';

export const registerUser = async (values: RegisterUserType) => {
  try {
    await client.post('auth/register', {
      username: values.username,
      email: values.email,
      password: values.password,
    });
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data;
  }
};
export const loginUser = async (values: LoginUserType) => {
  try {
    const { data } = await client.post('auth/login', {
      username: values.username,
      password: values.password,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data;
  }
};
