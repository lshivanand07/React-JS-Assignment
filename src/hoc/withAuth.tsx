import { Navigate } from 'react-router-dom';

const withAuth = (Component: React.ComponentType) => {
  return () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <Component />;
  };
};

export default withAuth;
