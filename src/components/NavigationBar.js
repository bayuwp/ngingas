import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol dropdown

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    navigate("/masuk"); // Arahkan ke halaman login
    setIsDropdownOpen(false); // Tutup dropdown
  };

  // Tutup dropdown setiap kali lokasi berubah
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <nav style={styles.navbar}>
      {/* Logo dan Instansi */}
      <div style={styles.leftSection}>
        <img
          src="/path/to/logo.png" // Ganti dengan path logo Anda
          alt="Logo"
          style={styles.logo}
        />
        <span style={styles.instansi}>Nama Instansi</span>
      </div>

      {/* Menu Navigasi */}
      <div style={styles.centerSection}>
        <Link to="/" style={styles.navLink}>
          Beranda
        </Link>
        <Link to="/materi" style={styles.navLink}>
          Materi
        </Link>
        <Link to="/karya" style={styles.navLink}>
          Karya
        </Link>
      </div>

      {/* Profil dan Dropdown */}
      <div style={styles.rightSection}>
        <div
          style={styles.profileContainer}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
        >
          <img
            src="/path/to/profile.png" // Ganti dengan path foto profil Anda
            alt="Profil"
            style={styles.profileImage}
          />
        </div>
        {isDropdownOpen && (
          <div style={styles.dropdownMenu}>
            <Link
              to="/bantuan"
              style={styles.dropdownItem}
              onClick={() => setIsDropdownOpen(false)} // Tutup dropdown setelah klik
            >
              Bantuan
            </Link>
            <Link
              to="/profile"
              style={styles.dropdownItem}
              onClick={() => setIsDropdownOpen(false)} // Tutup dropdown setelah klik
            >
              Tentang Saya
            </Link>
            <button
              onClick={handleLogout}
              style={styles.dropdownItem}
            >
              Logout
            </button>
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
    padding: "10px 20px",
    backgroundColor: "#004080", // Warna background navbar
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  instansi: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  centerSection: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  rightSection: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  profileContainer: {
    cursor: "pointer",
  },
  profileImage: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  dropdownMenu: {
    position: "absolute",
    top: "60px",
    right: "0",
    backgroundColor: "#fff",
    color: "#004080",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    overflow: "hidden",
  },
  dropdownItem: {
    display: "block",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#004080",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
};

export default NavigationBar;
