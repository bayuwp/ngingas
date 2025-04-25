import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Izinkan hanya dari localhost:3000
  methods: ['GET', 'POST', 'DELETE'], // Metode HTTP yang diizinkan
  credentials: true, // Jika Anda menggunakan cookie
};

app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 5001
;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Endpoint untuk mendapatkan semua materi
app.get('/api/materi', async (req, res) => {
  try {
    const materi = await prisma.materi.findMany();
    res.json(materi);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data materi' });
  }
});

// Endpoint untuk menambahkan materi baru
app.post('/api/materi', async (req, res) => {
  const { judul, deskripsi, linkVideo, namaModul, namaPpt, namaTugas, gambar } = req.body;
  
  console.log("req", req.body); // Menampilkan request body di console
  try {
    const newMateri = await prisma.materi.create({
      data: { judul, deskripsi, linkVideo, namaModul, namaPpt, namaTugas, gambar },
    });
    res.status(201).json(newMateri);
  } catch (error) {
    console.log("error", error); // Menampilkan error di console
    res.status(500).json({ error: 'Gagal menyimpan materi' });
  }
});

// Endpoint untuk menghapus materi
app.delete('/api/materi/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.materi.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Materi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus materi' });
  }
});