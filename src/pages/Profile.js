import React, { useState, useEffect } from "react";

const Profile = () => {
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null); // Untuk pratinjau foto
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Ambil data profil dari backend
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
      setFotoPreview(URL.createObjectURL(file)); // Pratinjau foto
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

    try {
      const response = await fetch("http://localhost:5001/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Ambil respons dari backend
        setNama(data[0].username || "");
        setFotoPreview(data[0].foto || "/path/to/default-avatar.png");
        setKelas(data[0].kelas || "");
        setJurusan(data[0].jurusan || "");
        alert("Profil berhasil disimpan!");

        window.location.reload(); // Refresh halaman
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#004080", marginBottom: "20px" }}>Profil</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="fotoInput">
          <img
            src={
              fotoPreview?.startsWith("blob:")
                ? fotoPreview
                : `http://localhost:5001${fotoPreview || "/path/to/default-avatar.png"}`
            }
            alt="Foto Profil"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              border: "2px solid #004080",
            }}
          />
        </label>
        <input
          id="fotoInput"
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          style={{ display: "none" }} // Sembunyikan input file
        />
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Kelas:</label>
          <input
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Jurusan:</label>
          <input
            type="text"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: isLoading ? "#ccc" : "#004080",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default Profile;