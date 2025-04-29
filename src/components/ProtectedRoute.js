import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token"); // Periksa token
  const role = localStorage.getItem("role"); // Periksa role

  if (!token) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/masuk" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Jika role tidak sesuai, arahkan ke halaman yang sesuai
    return <Navigate to="/dashboard" />;
  }

  // Jika sudah login dan role sesuai, tampilkan halaman
  return children;
};

export default ProtectedRoute;