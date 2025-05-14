import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Tidak ada token = belum login
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/masuk" state={{ from: location }} replace />;
  }

  // Cek role jika diperlukan
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Jika lolos semua validasi
  return children;
};

export default ProtectedRoute;
