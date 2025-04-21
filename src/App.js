// Semua import harus berada di atas sebelum kode lainnya
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HalamanAwal from "./pages/HalamanAwal";
import TentangDesa from "./pages/TentangDesa";
import KaryaSiswa from "./pages/KaryaSiswa";
import Masuk from "./pages/Masuk";
import Dashboard from "./pages/Dashboard";
import MessagePanel from "./pages/MessagePanel";
import Akun from "./pages/Akun";
import Jadwal from "./pages/Jadwal";
import Ujian from "./pages/Ujian";
import Bantuan from "./pages/Bantuan"; 
import Pelajaran1 from "./Dashboard/Pelajaran1";
import Pelajaran2 from "./Dashboard/Pelajaran2";
import Pelajaran3 from "./Dashboard/Pelajaran3";  
import Pelajaran4 from "./Dashboard/Pelajaran4";  
import Pelajaran5 from "./Dashboard/Pelajaran5";  
import Pelajaran6 from "./Dashboard/Pelajaran6";  
import Pelajaran7 from "./Dashboard/Pelajaran7";  
import Pelajaran8 from "./Dashboard/Pelajaran8";  
import Pelajaran9 from "./Dashboard/Pelajaran9";  

function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/dashboard", "/pesan", "/jadwal", "/tugas", "/bantuan", "/ujian","/pelajaran1","/pelajaran2","/pelajaran3","/pelajaran4","/pelajaran5","/pelajaran6","/pelajaran7","/pelajaran8","/pelajaran9"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/tentang-desa" element={<TentangDesa />} />
        <Route path="/karya-siswa" element={<KaryaSiswa />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pesan" element={<MessagePanel />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/ujian" element={<Ujian />} />
        <Route path="/bantuan" element={<Bantuan />} />
        <Route path="/pelajaran1" element={<Pelajaran1 />} />
        <Route path="/pelajaran2" element={<Pelajaran2 />} />
        <Route path="/pelajaran3" element={<Pelajaran3 />} />
        <Route path="/pelajaran4" element={<Pelajaran4 />} />
        <Route path="/pelajaran5" element={<Pelajaran5 />} />
        <Route path="/pelajaran6" element={<Pelajaran6 />} />
        <Route path="/pelajaran7" element={<Pelajaran7 />} />
        <Route path="/pelajaran8" element={<Pelajaran8 />} />
        <Route path="/pelajaran9" element={<Pelajaran9 />} />
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
