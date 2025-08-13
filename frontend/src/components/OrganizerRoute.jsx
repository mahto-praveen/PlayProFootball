import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OrganizerRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  if (!token) return <Navigate to="/login" />;
  if (role !== 2) return <Navigate to="/dashboard" />;

  return children;
};

export default OrganizerRoute;
