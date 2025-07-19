import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; // Tambahkan ini
import bg2 from "../assets/images/bg/bg2.jpg"; // pastikan sudah di-import

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Karya = () => {
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/produk`);
        let data = await response.json();
        // Jika data objek dan punya property data (misal { data: [...] }), ambil datanya
        if (data && typeof data === "object" && !Array.isArray(data) && Array.isArray(data.data)) {
          data = data.data;
        }
        setProdukList(Array.isArray(data) ? data : []);
      } catch (error) {
        setProdukList([]); // fallback agar produkList tetap array
        console.error("Gagal mengambil data produk:", error);
      }
    };

    fetchProduk();
  }, []);

  const generateWhatsAppLink = (produk) => {
    const phoneNumber = "628123456789";
    const message = `Halo, saya tertarik dengan produk "${produk.namaProduk}". Apakah masih tersedia?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const addToCart = async (produk) => {
    const newItem = {
      produkId: produk.id,
      qty: 1,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/keranjang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan ke keranjang");
      }

      const data = await response.json();
      setCart((prevCart) => [...prevCart, { ...produk, qty: 1, subtotal: produk.harga }]);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      alert("Gagal menambahkan ke keranjang");
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Hero Section dengan Background */}
      <section
        className="relative"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "320px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            color: "#fff",
            padding: "32px 40px 24px 40px",
            borderBottomLeftRadius: "16px",
            borderTopRightRadius: "32px",
            maxWidth: "420px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 8 }}>Karya Siswa</h1>
          <p style={{ fontSize: "1.2rem", margin: 0 }}>Home | Karya Siswa</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 24px 24px",
        display: "flex",
        gap: "18px",
        flexWrap: "wrap",
        marginTop: 32, // tambahkan baris ini
      }}>
        <input
          type="text"
          placeholder="Cari produk..."
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #e0e7ef",
            borderRadius: 8,
            padding: "8px 12px",
            outline: "none",
            fontSize: 15,
            background: "#fff",
            color: "#333"
          }}
        />
        <select
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #e0e7ef",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 15,
            background: "#fff",
            color: "#333"
          }}
        >
          <option value="">Semua Kategori</option>
          {/* Tambahkan opsi kategori lain di sini */}
        </select>
        <select
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #e0e7ef",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 15,
            background: "#fff",
            color: "#333"
          }}
        >
          <option value="">Semua Penjual</option>
          {/* Tambahkan opsi penjual lain di sini */}
        </select>
      </div>
      {/* Produk Grid */}
      {!selectedProduk ? (
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px 40px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px",
          }}
        >
          {produkList.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
              Tidak ada produk ditemukan.
            </div>
          )}
          {produkList.map((produk) => (
            <div
              key={produk.id}
              style={{
                border: "1px solid #e0e7ef",
                borderRadius: "14px",
                padding: "18px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(40,167,69,0.06)",
                cursor: "pointer",
                transition: "transform 0.18s, box-shadow 0.18s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 420,
              }}
              onClick={() => setSelectedProduk(produk)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(40,167,69,0.13)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(40,167,69,0.06)";
              }}
            >
              <img
                src={`${BACKEND_URL}${produk.foto}`}
                alt={produk.namaProduk}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "14px",
                  background: "#e5e7eb",
                }}
              />
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#28a745",
                  marginBottom: 8,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
                title={produk.namaProduk}
              >
                {produk.namaProduk}
              </h3>
              <div style={{ color: "#555", fontSize: 14, marginBottom: 8, textAlign: "center" }}>
                {produk.deskripsi.substring(0, 80)}...
              </div>
              <div style={{ color: "#28a745", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                Rp {produk.harga.toLocaleString("id-ID")}
              </div>
              <button
                style={{
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontWeight: 600,
                  fontSize: 15,
                  marginTop: "auto",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onClick={e => {
                  e.stopPropagation();
                  addToCart(produk);
                }}
                onMouseOver={e => e.currentTarget.style.background = "#218838"}
                onMouseOut={e => e.currentTarget.style.background = "#28a745"}
              >
                Tambah ke Keranjang
              </button>
              <a
                href={generateWhatsAppLink(produk)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  marginTop: 10,
                  background: "#e6f9ed",
                  color: "#28a745",
                  borderRadius: 8,
                  padding: "8px 0",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: "center",
                  border: "1px solid #28a745",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "#28a745";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "#e6f9ed";
                  e.currentTarget.style.color = "#28a745";
                }}
                onClick={e => e.stopPropagation()}
              >
                Beli via WhatsApp
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: "700px", margin: "0 auto", background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px rgba(40,167,69,0.08)", padding: 32 }}>
          <button
            onClick={() => setSelectedProduk(null)}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#218838"}
            onMouseOut={e => e.currentTarget.style.background = "#28a745"}
          >
            Kembali
          </button>
          <h2 style={{ color: "#28a745", fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{selectedProduk.namaProduk}</h2>
          <div style={{ color: "#28a745", fontWeight: 700, fontSize: 20, marginBottom: 18 }}>
            Harga: Rp {selectedProduk.harga.toLocaleString("id-ID")}
          </div>
          <img
            src={`${BACKEND_URL}${selectedProduk.foto}`}
            alt={selectedProduk.namaProduk}
            style={{
              width: "100%",
              maxHeight: "350px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "18px",
              background: "#e5e7eb",
            }}
          />
          {selectedProduk.video && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#28a745", marginBottom: "10px" }}>Video Karya</h3>
              <video
                controls
                style={{
                  width: "100%",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              >
                <source src={`${BACKEND_URL}${selectedProduk.video}`} type="video/mp4" />
                Browser Anda tidak mendukung pemutar video.
              </video>
            </div>
          )}
          <p style={{ marginBottom: 16 }}>{selectedProduk.deskripsi}</p>
          {selectedProduk.link && (
            <div style={{ marginTop: "10px", marginBottom: "16px" }}>
              <h4 style={{ fontWeight: 600 }}>Link Terkait:</h4>
              <a
                href={selectedProduk.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#28a745", textDecoration: "underline" }}
              >
                Kunjungi Link
              </a>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <a
              href={generateWhatsAppLink(selectedProduk)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "10px 20px",
                textAlign: "center",
                minWidth: 150,
                border: "1px solid #28a745",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#28a745";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "#28a745";
                e.currentTarget.style.color = "#fff";
              }}
            >
              Keranjang (WhatsApp)
            </a>
            <button
              onClick={() => addToCart(selectedProduk)}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "10px 20px",
                cursor: "pointer",
                minWidth: 150,
                transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#218838"}
              onMouseOut={e => e.currentTarget.style.background = "#28a745"}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      )}
      {/* Footer */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "20px 0", textAlign: "center" }}>
        <Container>
          <Row>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Lokasi:</strong><br />
                Desa Ngingas, Waru, Sidoarjo
              </p>
            </Col>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Email:</strong><br />
                desangingas@gmail.com
              </p>
            </Col>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Hubungi Kami:</strong><br />
                0318535447
              </p>
            </Col>
          </Row>
          <hr style={{ borderColor: "#444" }} />
          <p style={{ fontSize: "14px" }}>ⓒ Amrozenk - Universitas Negeri Surabaya</p>
        </Container>
      </div>
    </div>
  );
};

export default Karya;
