import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user) {
    return children;
  }

  return <Navigate to="/" />;
}
export default ProtectedRoute;
