import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return children;
};