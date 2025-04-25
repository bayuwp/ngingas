import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { FaVideo, FaImage, FaLink, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar.js";

const Jual = () => {
    const [formData, setFormData] = useState({
        foto: null,
        video: null,
        namaProduk: "",
        kategori: "",
        deskripsi: "",
    });

    const [produkList, setProdukList] = useState([]); // State untuk daftar produk
    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
    const [editId, setEditId] = useState(null); // ID produk yang sedang diedit

    // Fetch data produk dari backend
    useEffect(() => {
        const fetchProduk = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/produk");
                const data = await response.json();
                setProdukList(data);
            } catch (error) {
                console.error("Error fetching produk:", error);
            }
        };
        fetchProduk();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("namaProduk", formData.namaProduk);
        formDataToSend.append("kategori", formData.kategori);
        formDataToSend.append("deskripsi", formData.deskripsi);
        if (formData.foto) formDataToSend.append("foto", formData.foto);
        if (formData.video) formDataToSend.append("video", formData.video);

        try {
            const response = isEditing
                ? await fetch(`http://localhost:5001/api/produk/${editId}`, {
                      method: "PUT",
                      body: formDataToSend,
                  })
                : await fetch("http://localhost:5001/api/produk", {
                      method: "POST",
                      body: formDataToSend,
                  });

            if (response.ok) {
                const savedProduk = await response.json();
                setProdukList((prev) =>
                    isEditing
                        ? prev.map((produk) => (produk.id === savedProduk.id ? savedProduk : produk))
                        : [...prev, savedProduk]
                );
                alert(isEditing ? "Produk berhasil diperbarui!" : "Produk berhasil disimpan!");
                setFormData({
                    foto: null,
                    video: null,
                    namaProduk: "",
                    kategori: "",
                    deskripsi: "",
                });
                setIsEditing(false);
                setEditId(null);
            } else {
                alert("Gagal menyimpan produk.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menyimpan produk.");
        }
    };

    const handleEdit = (id) => {
        const produk = produkList.find((p) => p.id === id);
        setFormData({
            foto: null,
            video: null,
            namaProduk: produk.namaProduk,
            kategori: produk.kategori,
            deskripsi: produk.deskripsi,
        });
        setIsEditing(true);
        setEditId(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            try {
                const response = await fetch(`http://localhost:5001/api/produk/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("Produk berhasil dihapus!");
                    setProdukList((prev) => prev.filter((produk) => produk.id !== id));
                } else {
                    alert("Gagal menghapus produk.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan saat menghapus produk.");
            }
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Konten Utama */}
            <Container className="py-5" style={{ marginLeft: "90px", maxWidth: "800px" }}>
                <h2 className="fw-bold mb-4">Jual Produk</h2>

                {/* Form Produk */}
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-danger">* Foto Produk Promosi</Form.Label>
                    <div className="border p-3 rounded d-flex align-items-center gap-3 flex-column flex-md-row">
                        <FaImage size={32} />
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name="foto"
                            onChange={handleChange}
                            style={{ maxWidth: "300px" }}
                        />
                        <small className="text-muted">
                            Upload Foto 1:1. Foto akan digunakan di halaman promosi, pencarian, dan lainnya.
                        </small>
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Video Produk</Form.Label>
                    <div className="border p-3 rounded d-flex align-items-center gap-3 flex-column flex-md-row">
                        <FaVideo size={32} />
                        <Form.Control
                            type="file"
                            accept="video/mp4"
                            name="video"
                            onChange={handleChange}
                            style={{ maxWidth: "300px" }}
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
                    />
                    <div className="text-muted text-end">{formData.namaProduk.length}/255</div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-danger">* Kategori</Form.Label>
                    <div className="d-flex align-items-center border rounded px-3 py-2">
                        <FaLink className="me-2 text-muted" />
                        <Form.Control
                            type="text"
                            placeholder="Pilih kategori"
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            style={{ border: "none", outline: "none", boxShadow: "none" }}
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
                    />
                    <div className="text-muted text-end">{formData.deskripsi.length}/3000</div>
                </Form.Group>

                <Button variant="success" onClick={handleSubmit}>
                    {isEditing ? "Perbarui Produk" : "Kirim Produk"}
                </Button>

                {/* Tabel Produk */}
                <h3 className="fw-bold mt-5">Daftar Produk</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Produk</th>
                            <th>Kategori</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produkList.map((produk, index) => (
                            <tr key={produk.id}>
                                <td>{index + 1}</td>
                                <td>{produk.namaProduk}</td>
                                <td>{produk.kategori}</td>
                                <td>{produk.deskripsi}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(produk.id)}
                                    >
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
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
        </div>
    );
};

export default Jual;


