// Semua import harus berada di atas sebelum kode lainnya
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import HalamanAwal from "./pages/HalamanAwal.js";
import TentangDesa from "./pages/TentangDesa.js";
import Masuk from "./pages/Masuk.js";
import Register from "./pages/Register.js";
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

function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/masuk", "/register"].includes(location.pathname); // Navbar hanya disembunyikan di halaman login dan register

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/tentang-desa" element={<TentangDesa />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman untuk admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jual"
          element={
            <ProtectedRoute requiredRole="admin">
              <Jual />
            </ProtectedRoute>
          }
        />

        {/* Halaman untuk user */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/pesan" element={<MessagePanel />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/ujian" element={<Ujian />} />
        <Route path="/bantuan" element={<Bantuan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pelajaran1" element={<Pelajaran1 />} />
        <Route path="/pelajaran2" element={<Pelajaran2 />} />
        <Route path="/pelajaran3" element={<Pelajaran3 />} />
        <Route path="/pelajaran4" element={<Pelajaran4 />} />
        <Route path="/pelajaran5" element={<Pelajaran5 />} />
        <Route path="/pelajaran6" element={<Pelajaran6 />} />
        <Route path="/pelajaran7" element={<Pelajaran7 />} />
        <Route path="/pelajaran8" element={<Pelajaran8 />} />
        <Route path="/pelajaran9" element={<Pelajaran9 />} />

        {/* Halaman Materi dan Karya (hanya jika sudah login) */}
        <Route
          path="/materi"
          element={
            <ProtectedRoute requiredRole="user"> {/* Hanya pengguna dengan role "user" */}
              <Materi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/karya"
          element={
            <ProtectedRoute requiredRole="user"> {/* Hanya pengguna dengan role "user" */}
              <Karya />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
