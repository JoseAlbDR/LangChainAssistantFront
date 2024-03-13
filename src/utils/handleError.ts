import { toast } from 'react-toastify';

export const handleError = (error: unknown) => {
  console.log(error);
  if (error instanceof Error) return toast.error(error.message);
  if (typeof error === 'string') return toast.error(error);
  toast.error('Unknown error, check logs');
};
