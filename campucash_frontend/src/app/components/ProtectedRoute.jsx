import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ no login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ role not allowed
  if (!allowedRoles.includes(role)) {
    return <h2 style={{ color: "red", padding: "20px" }}>
      Access Denied: {role}
    </h2>;
  }

  return children;
};

export default ProtectedRoute;