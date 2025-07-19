// Semua import harus berada di atas sebelum kode lainnya
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar.js';
import HalamanAwal from './pages/HalamanAwal.js';
import TentangDesa from './pages/TentangDesa.js';
import Masuk from './pages/Masuk.js';
import Register from "./pages/Register.js";
import DashboardAdmin from './Admin/DashboardAdmin.js';
import DashboardUser from './AdUser/DashboardUser.js';
import Karya from './pages/Karya.js';
import Jual from './pages/Jual.js'
import ProtectedRoute from './components/ProtectedRoute.js';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/tentang-desa" element={<TentangDesa />} />
        <Route path="/karya" element={<Karya />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mulai-jual" element={<Jual />} />

        {/* Route untuk admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Route untuk user */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        {/* Route lain */}
        <Route path="/jual" element={<Jual />} />
      </Routes>
    </Router>
  );
}

export default App;
