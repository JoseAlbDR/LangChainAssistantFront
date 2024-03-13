import { Link, useRouteError } from 'react-router-dom';
import notFound from '../../../assets/images/not-found.svg';

export interface IError {
  message: string;
  statusCode?: number;
}

const ErrorPage = () => {
  const error = useRouteError() as IError;

  console.log(error);

  if (error.statusCode && error.statusCode === 404) {
    return (
      <div className="min-h-screen text-center text-capitalize flex flex-col items-center justify-center">
        <img src={notFound} alt="not found" className="w-72 mb-8 mt-12" />
        <h3 className="mb-2">Ohh! Page not found</h3>
        <p className="leading-6 mt-2 mb-4 text-secondary">
          we can´t seem to find the page you are looking for
        </p>
        <Link to="/" className="text-primary text-capitalize">
          Bring me back Home
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen text-center text-capitalize flex flex-col items-center justify-center">
      <h3 className="mb-2">Ups!</h3>
      <p className="leading-6 mt-2 mb-4 text-secondary">Algo malo pasó,</p>
      <p>{error.message}</p>
      <Link to="/" className="text-primary text-capitalize">
        Bring me back Home
      </Link>
    </div>
  );
};
export default ErrorPage;
