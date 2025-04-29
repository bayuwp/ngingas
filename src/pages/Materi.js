import React, { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Materi = () => {
  const [materiList, setMateriList] = useState([]); // Daftar materi
  const [selectedMateri, setSelectedMateri] = useState(null); // Materi yang dipilih

  // Ambil data materi dari backend
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/materi`);
        const data = await response.json();
        setMateriList(data);
      } catch (error) {
        console.error("Gagal mengambil data materi:", error);
      }
    };

    fetchMateri();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#004080" }}>Materi</h1>

      {/* Jika tidak ada materi yang dipilih, tampilkan daftar materi */}
      {!selectedMateri ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {materiList.map((materi) => (
            <div
              key={materi.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                width: "300px",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => setSelectedMateri(materi)} // Pilih materi
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#004080",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={materi.judul} // Tooltip untuk judul lengkap
              >
                {materi.judul}
              </h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {materi.deskripsi.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Jika ada materi yang dipilih, tampilkan detail materi
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => setSelectedMateri(null)} // Kembali ke daftar materi
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#004080",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Kembali
          </button>
          <h2 style={{ color: "#004080" }}>{selectedMateri.judul}</h2>
          <p>{selectedMateri.deskripsi}</p>
          {selectedMateri.gambar && (
            <div style={{ marginTop: "20px" }}>
              <h4>Gambar:</h4>
              <img
                src={`${BACKEND_URL}/images/${selectedMateri.gambar}`} // Ambil dari folder public/images
                alt={selectedMateri.judul}
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </div>
          )}
          {selectedMateri.namaModul && (
            <div style={{ marginTop: "20px" }}>
              <h4>Modul:</h4>
              <a
                href={`${BACKEND_URL}/pdfs/${selectedMateri.namaModul}`} // Ambil dari folder public/pdfs
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#004080", textDecoration: "underline" }}
              >
                Unduh Modul
              </a>
            </div>
          )}
          {selectedMateri.namaPpt && (
            <div style={{ marginTop: "20px" }}>
              <h4>PPT:</h4>
              <a
                href={`${BACKEND_URL}/ppts/${selectedMateri.namaPpt}`} // Ambil dari folder public/ppts
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#004080", textDecoration: "underline" }}
              >
                Unduh PPT
              </a>
            </div>
          )}
          {selectedMateri.namaTugas && (
            <div style={{ marginTop: "20px" }}>
              <h4>Tugas:</h4>
              <a
                href={`${BACKEND_URL}/pdfs/${selectedMateri.namaTugas}`} // Ambil dari folder public/pdfs
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#004080", textDecoration: "underline" }}
              >
                Unduh Tugas
              </a>
            </div>
          )}
          {selectedMateri.linkVideo && (
            <div style={{ marginTop: "20px" }}>
              <h4>Video Pembelajaran:</h4>
              <video
                controls
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              >
                <source src={`${BACKEND_URL}/videos/${selectedMateri.linkVideo}`} type="video/mp4" />
                Browser Anda tidak mendukung video.
              </video>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Materi;