import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const AuthRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
