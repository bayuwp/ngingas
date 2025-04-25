import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const app = express();
const prisma = new PrismaClient();

app.use('/public', express.static('public'));

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Izinkan hanya dari localhost:3000
  methods: ['GET', 'POST', 'DELETE'], // Metode HTTP yang diizinkan
  credentials: true, // Jika Anda menggunakan cookie
};

app.use(cors(corsOptions));
app.use(express.json());

// Membuat direktori jika belum ada
const directories = ['public/images', 'public/videos', 'public/pdfs', 'public/ppts'];

directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Konfigurasi multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'public/images'); // Simpan gambar di folder public/images
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'public/videos'); // Simpan video di folder public/videos
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'public/pdfs'); // Simpan PDF di folder public/pdfs
    } else if (file.mimetype.includes('presentation')) {
      cb(null, 'public/ppts'); // Simpan PPT di folder public/ppts
    } else {
      cb(new Error('File type not supported'), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const PORT = process.env.PORT || 5001;
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

// Endpoint untuk upload file gambar dan video
app.post('/api/upload', upload.fields([{ name: 'foto' }, { name: 'video' }]), (req, res) => {
  const fotoPath = req.files.foto ? `/images/${req.files.foto[0].filename}` : null;
  const videoPath = req.files.video ? `/videos/${req.files.video[0].filename}` : null;

  if (!fotoPath && !videoPath) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  res.status(200).json({
    foto: fotoPath,
    video: videoPath,
  });
});

// Endpoint untuk menambahkan produk baru dengan file
app.post('/api/produk', upload.fields([{ name: 'foto' }, { name: 'video' }]), async (req, res) => {
  console.log(req.body); // Log data yang diterima
  console.log(req.files); // Log file yang diterima

  const { namaProduk, kategori, deskripsi } = req.body;
  const foto = req.files.foto ? `/images/${req.files.foto[0].filename}` : null;
  const video = req.files.video ? `/videos/${req.files.video[0].filename}` : null;

  try {
    const newProduk = await prisma.produk.create({
      data: {
        namaProduk,
        kategori,
        deskripsi,
        foto,
        video,
      },
    });
    res.status(201).json(newProduk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menyimpan produk.' });
  }
});

app.get('/api/produk', async (req, res) => {
  try {
    const produkList = await prisma.produk.findMany(); // Mengambil semua data produk dari database
    res.json(produkList); // Mengembalikan data dalam format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data produk.' });
  }
});

app.put('/api/produk/:id', upload.fields([{ name: 'foto' }, { name: 'video' }]), async (req, res) => {
  const { id } = req.params;
  const { namaProduk, kategori, deskripsi } = req.body;
  const foto = req.files.foto ? `/images/${req.files.foto[0].filename}` : null;
  const video = req.files.video ? `/videos/${req.files.video[0].filename}` : null;

  try {
    const updatedProduk = await prisma.produk.update({
      where: { id: parseInt(id) },
      data: {
        namaProduk,
        kategori,
        deskripsi,
        ...(foto && { foto }),
        ...(video && { video }),
      },
    });
    res.status(200).json(updatedProduk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui produk.' });
  }
});