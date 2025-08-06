import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OrganizerRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);
  if (!token || role !== 2) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default OrganizerRoute;
