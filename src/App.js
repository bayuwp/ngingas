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
import Keranjang from './pages/keranjang.js';
import Profile from './pages/Profile.js';

import Dashboard from "./pages/Dashboard.js";
import AdminDashboard from "./Admin/Dashboard.js";
import MessagePanel from "./pages/MessagePanel.js";
import Akun from "./pages/Akun.js";
import Jadwal from "./pages/Jadwal.js";
import Ujian from "./pages/Ujian.js";
import Jual from "./pages/Jual.js";
import Bantuan from "./pages/Bantuan.js";
import Materi from "./pages/Materi.js";
import Karya from "./pages/Karya.js";
import Profile from "./pages/Profile.js";
import Keranjang from "./pages/keranjang.js";
import Pelajaran1 from "./Dashboard/Pelajaran1.js";
import Pelajaran2 from "./Dashboard/Pelajaran2.js";
import Pelajaran3 from "./Dashboard/Pelajaran3.js";
import Pelajaran4 from "./Dashboard/Pelajaran4.js";
import Pelajaran5 from "./Dashboard/Pelajaran5.js";
import Pelajaran6 from "./Dashboard/Pelajaran6.js";
import Pelajaran7 from "./Dashboard/Pelajaran7.js";
import Pelajaran8 from "./Dashboard/Pelajaran8.js";
import Pelajaran9 from "./Dashboard/Pelajaran9.js";
import { Navbar } from "react-bootstrap";



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
        <Route path="/jual" element={<Jual />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/profile" element={<Profile />} />

        {/* Route untuk admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transaksi"
          element={<TransaksiAdmin />}
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
      </Routes>
    </Router>
  );
}

export default App;
