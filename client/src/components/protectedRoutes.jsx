import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, role }) {
  const { isAuthenticated, isauthChecked, user } = useSelector(
    (state) => state.userAuth
  );

  // ⏳ Auth not checked yet → App.jsx handles loader
  if (!isauthChecked) {
    return null;
  }

  // 🔒 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 Logged in but not authorized
  if (role && user?.role !== role) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Authorized
  return children;
}

export default ProtectedRoutes;
