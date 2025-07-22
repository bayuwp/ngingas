import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ELogo from '../assets/images/logo/E.png'; // Tambahkan import ini

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol dropdown
  const [fotoProfil, setFotoProfil] = useState("/path/to/default-avatar.png"); // Default foto profil
  const [activeBtn, setActiveBtn] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token')); // Gunakan useState untuk token

  useEffect(() => {
    // Update token setiap kali localStorage berubah
    setToken(localStorage.getItem('auth_token'));
  }, [localStorage.getItem('auth_token')]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // Hapus token dari localStorage
    localStorage.removeItem("role"); // Hapus role dari localStorage
    localStorage.removeItem("user_id"); // Hapus username dari localStorage
    navigate("/"); // Arahkan ke halaman awal
    setIsDropdownOpen(false); // Tutup dropdown
  };

  // Tutup dropdown setiap kali lokasi berubah
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Kirim token jika diperlukan
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFotoProfil(data.foto || "/path/to/default-avatar.png"); // Gunakan foto dari database atau default
        } else {
          console.error("Gagal mengambil data profil");
        }
      } catch (error) {
        console.error("Error saat mengambil data profil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleMulaiJualClick = () => {
    console.log("Tombol Mulai Jual diklik");
    console.log("Nilai token:", token);
    if (!token) {
      console.log("Pengguna belum login, mengarahkan ke /masuk");
      navigate('/masuk'); // Arahkan ke halaman Masuk.js jika belum login
    } else {
      console.log("Pengguna sudah login, mengarahkan ke /jual");
      navigate('/jual'); // Arahkan ke halaman Jual.js jika sudah login
    }
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.leftSection}>
        <img
          src={ELogo}
          alt="Logo"
          style={styles.logo}
        />
        {/* Tidak ada Nama Instansi */}
      </div>

      {/* Menu Kiri */}
      <div style={{ display: "flex", gap: "32px", flex: 1 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            ...styles.navLink,
            ...(activeBtn === "beranda" ? styles.navLinkActive : {})
          }}
          onMouseDown={() => setActiveBtn("beranda")}
          onMouseUp={() => setActiveBtn(null)}
          onMouseLeave={() => setActiveBtn(null)}
        >
          Beranda
        </button>
        <Link
          to="/karya"
          style={{
            ...styles.navLink,
            ...(activeBtn === "karya" ? styles.navLinkActive : {})
          }}
          onMouseDown={() => setActiveBtn("karya")}
          onMouseUp={() => setActiveBtn(null)}
          onMouseLeave={() => setActiveBtn(null)}
        >
          Karya
        </Link>
        <Link
          to="/tentang-desa"
          style={{
            ...styles.navLink,
            ...(activeBtn === "tentang" ? styles.navLinkActive : {})
          }}
          onMouseDown={() => setActiveBtn("tentang")}
          onMouseUp={() => setActiveBtn(null)}
          onMouseLeave={() => setActiveBtn(null)}
        >
          Tentang Desa
        </Link>
      </div>

      {/* Menu Kanan */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          style={{
            ...styles.greenButton,
            ...(activeBtn === "jual" ? styles.greenButtonActive : {})
          }}
          onClick={handleMulaiJualClick}
          onMouseDown={() => setActiveBtn("jual")}
          onMouseUp={() => setActiveBtn(null)}
          onMouseLeave={() => setActiveBtn(null)}
        >
          Mulai Jual
        </button>
        <a
          href="https://lms.unesacreative.my.id/login/index.php"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.greenButton,
            ...(activeBtn === "lms" ? styles.greenButtonActive : {})
          }}
          onMouseDown={() => setActiveBtn("lms")}
          onMouseUp={() => setActiveBtn(null)}
          onMouseLeave={() => setActiveBtn(null)}
        >
          Masuk LMS
        </a>
        {!token && (
          <button
            onClick={() => navigate('/masuk')}
            style={{
              ...styles.greenButton,
              ...(activeBtn === "login" ? styles.greenButtonActive : {})
            }}
            onMouseDown={() => setActiveBtn("login")}
            onMouseUp={() => setActiveBtn(null)}
            onMouseLeave={() => setActiveBtn(null)}
          >
            Login
          </button>
        )}
        {token && (
          <div style={styles.profileContainer} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img
              src={`http://localhost:5001${fotoProfil}`}
              alt="Profil"
              style={styles.profileImage}
            />
            {isDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link to="/profile" style={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  Tentang Saya
                </Link>
                <Link to="/keranjang" style={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  Keranjang
                </Link>
                <button onClick={handleLogout} style={styles.dropdownItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 32px",
    backgroundColor: "#fff",
    color: "#28a745",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.10)",
    position: "fixed",
    top: "16px",           // Jarak dari atas
    left: 0,
    right: 0,
    width: "calc(100% - 32px)", // Lebar dikurangi margin kiri-kanan
    margin: "0 16px",     // Jarak kiri-kanan
    borderRadius: "16px", // Melengkung
    zIndex: 100
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    marginRight: "24px", // Tambahkan atau perbesar jarak di sini
  },
  instansi: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745", // Hijau
  },
  centerSection: {
    display: "flex",
    gap: "32px", // Perbesar jarak antar menu
  },
  navLink: {
    color: "#28a745",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.3s, transform 0.1s",
    padding: "6px 12px",
  },
  navLinkActive: {
    color: "#218838",
    transform: "scale(0.96)",
  },
  rightSection: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "24px", // Perbesar jarak antar tombol kanan
  },
  profileContainer: {
    cursor: "pointer",
  },
  profileImage: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    border: "2px solid #28a745", // Border hijau
  },
  dropdownMenu: {
    position: "absolute",
    top: "60px",
    right: "0",
    backgroundColor: "#fff",
    color: "#28a745",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    overflow: "hidden",
  },
  dropdownItem: {
    display: "block",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#28a745", // Hijau
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    background: "none",
    border: "none",
    transition: "background-color 0.3s",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
  greenButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.3s, transform 0.1s",
  },
  greenButtonActive: {
    backgroundColor: "#218838",
    transform: "scale(0.96)",
  },
};

export default NavigationBar;
