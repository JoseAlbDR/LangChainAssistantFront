import { PropsWithChildren } from 'react';
import { useAuthStatus } from '../../layouts/useAuthStatus';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const { data: authStatus } = useAuthStatus();

  return authStatus ? children : <Navigate to={'/login'} />;
};

export default ProtectedRoutes;
