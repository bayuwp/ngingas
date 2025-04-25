import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";

// Data produk
const karyaTerlaris = [
  {
    id: 1,
    name: "Setir Palang Tinggi",
    price: "Rp 100.000",
    image: "./images/setir1.png",
    seller: "AFANDI JAMAL AMIROZI",
  },
  {
    id: 2,
    name: "Kunci Busi Vespa",
    price: "Rp 15.000",
    image: "./images/kunci-vespa.png",
    seller: "FAKHRIZA GUTIHER",
  },
  {
    id: 3,
    name: "Planger Beat",
    price: "Rp 15.000",
    image: "./images/planger.png",
    seller: "FAKHAR RIZKI MUSTOFA",
  },
  {
    id: 4,
    name: "Setir RX King",
    price: "Rp 100.000",
    image: "./images/setir-rx.png",
    seller: "REHAN FAUZI",
  },
];

const rekomendasi = [
  {
    id: 5,
    name: "Heich Impela Quick Mesin",
    price: "Rp 100.000",
    image: "./images/heich.png",
    seller: "BILAL DWI NUGROHO",
  },
  {
    id: 6,
    name: "Kunci Busi Vespa",
    price: "Rp 15.000",
    image: "./images/kunci-vespa2.png",
    seller: "MUCHLISON FIRDAUS",
  },
  {
    id: 7,
    name: "Planger Beat",
    price: "Rp 15.000",
    image: "./images/planger2.png",
    seller: "ZIDNI IZZAM",
  },
  {
    id: 8,
    name: "Argo",
    price: "Rp 120.000",
    image: "./images/argo.png",
    seller: "AKMAL MULTAZID",
  },
  {
    id: 9,
    name: "Asbak",
    price: "Rp 25.000",
    image: "./images/asbak.png",
    seller: "MUHAMMAD ABDURRAHMAN",
  },
  {
    id: 10,
    name: "Kursi Besi",
    price: "Rp 130.000",
    image: "./images/kursi.png",
    seller: "ZIDNI IZZAM",
  },
  {
    id: 11,
    name: "Sekop",
    price: "Rp 80.000",
    image: "./images/sekop.png",
    seller: "FAKHRIZA GUTIHER",
  },
  {
    id: 12,
    name: "Argo",
    price: "Rp 150.000",
    image: "./images/argo2.png",
    seller: "AKMAL MULTAZID",
  },
];

// Komponen Card Produk
const ProductCard = ({ product, onBeli }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
    <div className="card h-100 border-success shadow-sm">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold text-success small">{product.name}</h6>
        <p className="text-muted small mb-1">{product.seller}</p>
        <h6 className="text-success mt-auto">{product.price}</h6>
        <button className="btn btn-success btn-sm mt-2" onClick={() => onBeli(product)}>
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
);

// Komponen Modal
const BeliSekarang = ({ show, onHide, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Body className="text-center">
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
        <h5 className="fw-bold mt-3">{product.name}</h5>
        <h5 className="text-success">{product.price}</h5>

        <div className="d-flex justify-content-center align-items-center my-2">
          <Button variant="success" size="sm" onClick={handleDecrease}>
            <FaMinus />
          </Button>
          <span className="mx-3 fs-5">{quantity}</span>
          <Button variant="success" size="sm" onClick={handleIncrease}>
            <FaPlus />
          </Button>
        </div>

        <p className="text-muted small">Terjual: 16</p>
        <div className="mb-2 text-warning">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <p className="text-muted small text-start">
          Setir motor dengan desain palang tinggi yang kokoh dan stylish. Cocok untuk modifikasi motor trail, bebek, atau custom bike lainnya. Memberikan posisi berkendara yang lebih nyaman dan tampilan yang lebih gagah. Terbuat dari bahan berkualitas dengan finishing chrome mengkilap.
        </p>

        <Button variant="success" className="w-100 my-1">Pesan</Button>
        <Button variant="success" className="w-100">Chat Penjual</Button>
      </Modal.Body>
    </Modal>
  );
};

const KaryaSiswa = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBeliClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <div className="position-relative bg-dark text-white py-5">
        <div className="green-circle"></div>
        <Container className="position-relative z-1">
          <h1 className="fw-bold mb-1">Karya Siswa</h1>
          <p className="text-white-50 small">
            <Link to="/" className="text-white-50 text-decoration-none">
              Home
            </Link>{" "}
            | Karya Siswa
          </p>
        </Container>
      </div>

      <div className="container py-5 bg-white">
        <div className="row g-2 my-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Cari produk..."
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Semua Kategori"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Semua Penjual"
            />
          </div>
        </div>

        <h5 className="fw-bold mb-3">PRODUK TERLARIS</h5>
        <div className="row g-3 mb-5">
          {karyaTerlaris.map((product) => (
            <ProductCard key={product.id} product={product} onBeli={handleBeliClick} />
          ))}
        </div>

        <h5 className="fw-bold mb-3">REKOMENDASI UNTUK ANDA</h5>
        <div className="row g-3">
          {rekomendasi.map((product) => (
            <ProductCard key={product.id} product={product} onBeli={handleBeliClick} />
          ))}
        </div>
      </div>

      {/* MODAL BELI */}
      <BeliSekarang show={showModal} onHide={() => setShowModal(false)} product={selectedProduct} />
    </>
  );
};

export default KaryaSiswa;
