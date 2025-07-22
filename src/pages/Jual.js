import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import { FaVideo, FaImage, FaLink, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Jual.css'; // Import file CSS custom jika ada

const Jual = () => {
    const [formData, setFormData] = useState({
        foto: null,
        video: null,
        namaProduk: "",
        kategori: "",
        deskripsi: "",
        harga: "",
    });

    const [fotoPreview, setFotoPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [produkList, setProdukList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    // Ambil produk milik user yang login
    const fetchProduk = async () => {
        try {
            const userId = localStorage.getItem('id') || localStorage.getItem('user_id');
            if (!userId) return;
            const response = await fetch(`http://localhost:5001/api/produk?userId=${userId}`);
            const data = await response.json();
            setProdukList(Array.isArray(data) ? data : []);
        } catch (error) {
            setProdukList([]);
            console.error("Error fetching produk:", error);
        }
    };

    useEffect(() => {
        fetchProduk();
    }, []);

    // Handle input form
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        if (name === "foto" && files) {
            setFotoPreview(URL.createObjectURL(files[0]));
        } else if (name === "video" && files) {
            setVideoPreview(URL.createObjectURL(files[0]));
        }
    };

    // Submit form (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id') || localStorage.getItem('user_id');
        if (!userId) {
            alert("User belum login!");
            navigate('/login');
            return;
        }

        if (!formData.namaProduk || !formData.kategori || !formData.deskripsi || !formData.harga) {
            alert("Semua field wajib diisi!");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("namaProduk", formData.namaProduk);
        formDataToSend.append("kategori", formData.kategori);
        formDataToSend.append("deskripsi", formData.deskripsi);
        formDataToSend.append("harga", formData.harga);
        formDataToSend.append("userId", userId);
        if (formData.foto) formDataToSend.append("foto", formData.foto);
        if (formData.video) formDataToSend.append("video", formData.video);

        try {
            const url = isEditing
                ? `http://localhost:5001/api/produk/${editId}`
                : "http://localhost:5001/api/produk";

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                body: formDataToSend,
            });

            const savedProduk = await response.json();

            if (response.ok) {
                alert(isEditing ? "Produk berhasil diperbarui!" : "Produk berhasil disimpan!");
                setFormData({
                    foto: null,
                    video: null,
                    namaProduk: "",
                    kategori: "",
                    deskripsi: "",
                    harga: "",
                });
                setIsEditing(false);
                setEditId(null);
                setFotoPreview(null);
                setVideoPreview(null);
                fetchProduk();
            } else {
                alert(`Gagal menyimpan produk: ${savedProduk.error || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menyimpan produk.");
        }
    };

    // Edit produk
    const handleEdit = (id) => {
        const produk = produkList.find((p) => p.id === id);
        setFormData({
            foto: null,
            video: null,
            namaProduk: produk.namaProduk,
            kategori: produk.kategori,
            deskripsi: produk.deskripsi,
            harga: produk.harga,
        });
        setIsEditing(true);
        setEditId(id);
        setFotoPreview(produk.foto ? `http://localhost:5001${produk.foto}` : null);
        setVideoPreview(produk.video ? `http://localhost:5001${produk.video}` : null);
    };

    // Hapus produk
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            try {
                const response = await fetch(`http://localhost:5001/api/produk/${id}`, {
                    method: "DELETE",
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Produk berhasil dihapus!");
                    fetchProduk();
                } else {
                    alert(data.error || "Gagal menghapus produk.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan saat menghapus produk.");
            }
        }
    };

    return (
        <Container className="py-5 modern-container">
            <h2 className="fw-bold mb-4 modern-heading">Jual Produk</h2>
            <Row>
                <Col xs={12} md={7} lg={8} className="mr-lg-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-danger">* Foto Produk Promosi</Form.Label>
                            <div className="modern-input-group">
                                <FaImage size={32} />
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    name="foto"
                                    onChange={handleChange}
                                />
                                <small className="text-muted">
                                    Upload Foto 1:1. Foto akan digunakan di halaman promosi, pencarian, dan lainnya.
                                </small>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Video Produk</Form.Label>
                            <div className="modern-input-group">
                                <FaVideo size={32} />
                                <Form.Control
                                    type="file"
                                    accept="video/mp4"
                                    name="video"
                                    onChange={handleChange}
                                />
                                <small className="text-muted">
                                    Maks. 30MB, durasi 10–60 detik, resolusi max 1280x1280px, format MP4.
                                </small>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-danger">* Nama Produk</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Merek + Tipe Produk + Fitur Produk (Bahan, Warna, Ukuran, Variasi)"
                                name="namaProduk"
                                value={formData.namaProduk}
                                onChange={handleChange}
                                maxLength={255}
                                className="modern-input"
                            />
                            <div className="text-muted text-end">{formData.namaProduk.length}/255</div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-danger">* Kategori</Form.Label>
                            <div className="modern-input-group">
                                <FaLink className="me-2 text-muted" />
                                <Form.Control
                                    type="text"
                                    placeholder="Pilih kategori"
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleChange}
                                    className="modern-input"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-danger">* Deskripsi Produk</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                maxLength={3000}
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                className="modern-input"
                            />
                            <div className="text-muted text-end">{formData.deskripsi.length}/3000</div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-danger">* Harga</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Masukkan harga produk"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                min={0}
                                step="0.01"
                                className="modern-input"
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="modern-button">
                            {isEditing ? "Perbarui Produk" : "Kirim Produk"}
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md={5} lg={4}>
                    {fotoPreview && (
                        <div className="mb-4 modern-preview">
                            <img src={fotoPreview} alt="Preview Foto" className="modern-preview-image" />
                        </div>
                    )}

                    {videoPreview && (
                        <div className="mb-4 modern-preview">
                            <video src={videoPreview} controls className="modern-preview-video" />
                        </div>
                    )}
                </Col>
            </Row>

            {/* Tabel Produk */}
            <h3 className="fw-bold mt-5 modern-heading">Daftar Produk</h3>
            <Table striped bordered hover className="modern-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Produk</th>
                        <th>Kategori</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(produkList) ? produkList : []).map((produk, index) => (
                        <tr key={produk.id}>
                            <td>{index + 1}</td>
                            <td>{produk.namaProduk}</td>
                            <td>{produk.kategori}</td>
                            <td>{produk.deskripsi}</td>
                            <td>{produk.harga}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2 modern-button modern-button-warning"
                                    onClick={() => handleEdit(produk.id)}
                                >
                                    <FaEdit /> Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="modern-button modern-button-danger"
                                    onClick={() => handleDelete(produk.id)}
                                >
                                    <FaTrash /> Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Jual;


