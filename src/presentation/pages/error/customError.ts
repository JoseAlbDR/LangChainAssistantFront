import { AxiosError } from 'axios';

export class CustomError extends AxiosError {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}
