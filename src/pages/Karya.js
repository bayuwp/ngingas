import React, { useState, useEffect } from "react";
import { FaRemoveFormat } from "react-icons/fa";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Karya = () => {
  const [produkList, setProdukList] = useState([]); // Daftar produk
  const [selectedProduk, setSelectedProduk] = useState(null); // Produk yang dipilih

  // Ambil data produk dari backend
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

  // Fungsi untuk membuat tautan WhatsApp
  const generateWhatsAppLink = (produk) => {
    const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp Anda
    const message = `Halo, saya tertarik dengan produk "${produk.judul}". Apakah masih tersedia?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#004080" }}>Karya</h1>

      {/* Jika tidak ada produk yang dipilih, tampilkan daftar produk */}
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
              onClick={() => setSelectedProduk(produk)} // Pilih produk
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
                src={`${BACKEND_URL}/public${produk.gambar}`}
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
                title={produk.judul} // Tooltip untuk judul lengkap
              >
                {produk.judul}
              </h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {produk.deskripsi.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Jika ada produk yang dipilih, tampilkan detail produk
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => setSelectedProduk(null)} // Kembali ke daftar produk
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
          <h2 style={{ color: "#004080" }}>{selectedProduk.judul}</h2>
          <img
            src={`${BACKEND_URL}/${selectedProduk.gambar}`}
            alt={selectedProduk.judul}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />
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
          {/* Tombol Keranjang */}
          <a
            href={generateWhatsAppLink(selectedProduk)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#25D366", // Warna hijau khas WhatsApp
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