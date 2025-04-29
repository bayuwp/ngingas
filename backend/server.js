import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import path from 'path';

// Definisikan __dirname secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();

const SECRET_KEY = 'your_secret_key'; // Ganti dengan secret key Anda

// Middleware untuk memeriksa autentikasi dan role admin
const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (user && user.role === 'admin') {
      req.user = user;
      next();
    } else {
      res.status(403).json({ error: 'Akses ditolak. Anda bukan admin.' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid.' });
  }
};

// Middleware untuk menyajikan folder public
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));
app.use('/ppts', express.static(path.join(__dirname, 'public/ppts')));
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

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
    const materiList = await prisma.materi.findMany();
    res.status(200).json(materiList);
  } catch (error) {
    console.error('Gagal mengambil data materi:', error);
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
    const produkList = await prisma.produk.findMany();
    res.status(200).json(produkList);
  } catch (error) {
    console.error('Gagal mengambil data produk:', error);
    res.status(500).json({ error: 'Gagal mengambil data produk' });
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

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Periksa apakah username sudah ada
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Username sudah digunakan' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'user', // Default role
      },
    });

    res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ error: 'Gagal registrasi' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      console.log('Username tidak ditemukan:', username);
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    console.log('Password di database:', user.password);
    console.log('Password yang dimasukkan:', password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Password salah untuk username:', username);
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    console.log('Login berhasil untuk username:', username);

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login berhasil', token, role: user.role });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ error: 'Gagal login' });
  }
});

app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: 'Selamat datang di dashboard admin!' });
});