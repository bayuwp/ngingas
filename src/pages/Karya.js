import React, { useState, useEffect } from "react";
import { FaRemoveFormat } from "react-icons/fa";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Karya = () => {
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/produk`);
        const data = await response.json();
        setProdukList(data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      }
    };

    fetchProduk();
  }, []);

  const generateWhatsAppLink = (produk) => {
    const phoneNumber = "628123456789";
    const message = `Halo, saya tertarik dengan produk "${produk.judul}". Apakah masih tersedia?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#004080" }}>Karya</h1>

      {!selectedProduk ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {produkList.map((produk) => (
            <div
              key={produk.id}
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
              onClick={() => setSelectedProduk(produk)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
                src={`${BACKEND_URL}${produk.foto}`}
                alt={produk.judul}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
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
                title={produk.namaProduk}
              >
                {produk.namaProduk}
              </h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {produk.deskripsi.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => setSelectedProduk(null)}
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

          <h2 style={{ color: "#004080" }}>{selectedProduk.namaProduk}</h2>

          <img
            src={`${BACKEND_URL}${selectedProduk.foto}`}
            alt={selectedProduk.namaProduk}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />

          {/* Tampilkan video jika tersedia */}
          {selectedProduk.video && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#004080", marginBottom: "10px" }}>Video Karya</h3>
              <video
                controls
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              >
                <source src={`${BACKEND_URL}${selectedProduk.video}`} type="video/mp4" />
                Browser Anda tidak mendukung pemutar video.
              </video>
            </div>
          )}

          <p>{selectedProduk.deskripsi}</p>

          {selectedProduk.link && (
            <div style={{ marginTop: "20px" }}>
              <h4>Link Terkait:</h4>
              <a
                href={selectedProduk.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#004080", textDecoration: "underline" }}
              >
                Kunjungi Link
              </a>
            </div>
          )}

          <a
            href={generateWhatsAppLink(selectedProduk)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#25D366",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Keranjang (WhatsApp)
          </a>
        </div>
      )}
    </div>
  );
};

export default Karya;
