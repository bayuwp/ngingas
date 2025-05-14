import React, { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Materi = () => {
  const [materiList, setMateriList] = useState([]);
  const [selectedMateri, setSelectedMateri] = useState(null);

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

  // Fungsi untuk embed YouTube
  const renderVideo = (url) => {
    const youtubeMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title="Video Pembelajaran"
          style={{ borderRadius: "8px" }}
        ></iframe>
      );
    }
    return (
      <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
        <source src={url} type="video/mp4" />
        Browser Anda tidak mendukung video.
      </video>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#004080" }}>Materi</h1>

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
              onClick={() => setSelectedMateri(materi)}
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
                title={materi.judul}
              >
                {materi.judul}
              </h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {materi.deskripsi.length > 100
                  ? `${materi.deskripsi.substring(0, 100)}...`
                  : materi.deskripsi}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => setSelectedMateri(null)}
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
                src={`${BACKEND_URL}/images/${selectedMateri.gambar}`}
                alt={selectedMateri.judul}
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </div>
          )}

          {selectedMateri.namaModul && (
            <div style={{ marginTop: "20px" }}>
              <h4>Modul:</h4>
              <a
                href={`${BACKEND_URL}/pdfs/${selectedMateri.namaModul}`}
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
                href={`${BACKEND_URL}/ppts/${selectedMateri.namaPpt}`}
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
                href={`${BACKEND_URL}/pdfs/${selectedMateri.namaTugas}`}
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
              {renderVideo(selectedMateri.linkVideo)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Materi;
