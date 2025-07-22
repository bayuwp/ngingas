import React, { useState, useEffect } from "react";

const Profile = () => {
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNama(data.username || "");
          setFotoPreview(data.foto || "/path/to/default-avatar.png");
          setKelas(data.kelas || "");
          setJurusan(data.jurusan || "");
          setAlamat(data.alamat || "");
        } else {
          console.error("Gagal mengambil data profil");
        }
      } catch (error) {
        console.error("Error saat mengambil data profil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    if (foto) formData.append("foto", foto);
    formData.append("kelas", kelas);
    formData.append("jurusan", jurusan);
    formData.append("alamat", alamat);

    try {
      const response = await fetch("http://localhost:5001/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setNama(data[0].username || "");
        setFotoPreview(data[0].foto || "/path/to/default-avatar.png");
        setKelas(data[0].kelas || "");
        setJurusan(data[0].jurusan || "");
        setAlamat(data.alamat || "");
        alert("Profil berhasil disimpan!");
        window.location.reload();
      } else {
        alert("Gagal menyimpan profil.");
      }
    } catch (error) {
      console.error("Error saat menyimpan profil:", error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e6f9ed 0%, #b2f2c2 100%)",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(40,167,69,0.13)",
          padding: "32px 28px",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "#28a745",
            marginBottom: "28px",
            fontWeight: 700,
            fontSize: "2rem",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Profil Pengguna
        </h1>
        {/* Avatar & Upload Foto */}
        <div
          style={{
            marginBottom: "24px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <label htmlFor="fotoInput" style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                transition: "box-shadow 0.2s",
              }}
            >
              <img
                src={
                  fotoPreview?.startsWith("blob:")
                    ? fotoPreview
                    : `http://localhost:5001${fotoPreview || "/path/to/default-avatar.png"}`
                }
                alt="Foto Profil"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #28a745",
                  boxShadow: "0 4px 16px rgba(40,167,69,0.18)",
                  background: "#e6f9ed",
                  transition: "transform 0.2s",
                }}
              />
              {/* Icon edit */}
              <span
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  background: "#28a745",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "6px",
                  fontSize: "16px",
                  boxShadow: "0 2px 6px rgba(40,167,69,0.15)",
                  border: "2px solid #fff",
                  cursor: "pointer",
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.439 1.439-2.121-2.121 1.439-1.439a.5.5 0 0 1 .706 0l1.415 1.415zm-2.121 2.121L3 14.44V16h1.56l10.381-10.381-2.56-2.56z" />
                </svg>
              </span>
            </div>
          </label>
          <input
            id="fotoInput"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            style={{ display: "none" }}
          />
          <div
            style={{
              fontSize: "13px",
              color: "#218838",
              marginTop: "8px",
            }}
          >
            Klik foto untuk mengganti avatar
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#28a745",
              }}
            >
              Nama:
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1.5px solid #b2f2c2",
                background: "#f6fff9",
                fontSize: "16px",
                outline: "none",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#28a745",
              }}
            >
              Kelas:
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1.5px solid #b2f2c2",
                background: "#f6fff9",
                fontSize: "16px",
                outline: "none",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#28a745",
              }}
            >
              Jurusan:
            </label>
            <input
              type="text"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1.5px solid #b2f2c2",
                background: "#f6fff9",
                fontSize: "16px",
                outline: "none",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "7px",
                color: "#28a745",
              }}
            >
              Alamat:
            </label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1.5px solid #b2f2c2",
                background: "#f6fff9",
                fontSize: "16px",
                minHeight: "80px",
                outline: "none",
                resize: "vertical",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#b2f2c2" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "17px",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px rgba(40,167,69,0.10)",
              transition: "background 0.2s",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
