import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Masuk = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const navigate = useNavigate(); // Menggunakan useNavigate untuk pindah halaman

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Simpan token di localStorage
        localStorage.setItem("role", data.role); // Simpan role di localStorage

        // Arahkan pengguna berdasarkan role
        if (data.role === "admin") {
          navigate("/admin/dashboard"); // Halaman admin
        } else {
          navigate("/dashboard"); // Halaman user
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Gagal login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Ubah type berdasarkan state
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              style={styles.togglePassword}
            >
              {showPassword ? "🙈" : "👁️"} {/* Ikon untuk toggle */}
            </span>
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.registerText}>
          Belum punya akun?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  togglePassword: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  registerText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  registerLink: {
    color: "#4CAF50",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Masuk;