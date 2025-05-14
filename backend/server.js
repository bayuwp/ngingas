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
const authenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan di authenticated' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Simpan user ke dalam req untuk digunakan di handler route
    req.headers.user = user;
    console.log("req headers user", req.headers.user); // Menampilkan user di console

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid' });
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
      cb(null, 'public/images');
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'public/videos');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'public/pdfs');
    } else if (file.mimetype.includes('presentation')) {
      cb(null, 'public/ppts');
    } else {
      cb(new Error('File type not supported'), null);
    }
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${originalName}`);
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
app.post('/api/materi', upload.fields([
  { name: 'foto' },
  { name: 'modul' },
  { name: 'ppt' },
  { name: 'tugas' }
]), async (req, res) => {
  try {
    const { judul, deskripsi, linkVideo } = req.body;

    const gambarPath = req.files['foto'] ? req.files['foto'][0].filename : null;
    const namaModul = req.files['modul'] ? req.files['modul'][0].filename : null;
    const namaPpt = req.files['ppt'] ? req.files['ppt'][0].filename : null;
    const namaTugas = req.files['tugas'] ? req.files['tugas'][0].filename : null;

    const newMateri = await prisma.materi.create({
      data: {
        judul,
        deskripsi,
        linkVideo,
        namaModul,
        namaPpt,
        namaTugas,
        gambar: gambarPath,
      }
    });

    res.status(201).json(newMateri);
  } catch (err) {
    console.error("Error saat menyimpan materi:", err);
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

app.post('/api/upload/materi', upload.fields([
  { name: 'foto' },
  { name: 'modul' },
  { name: 'ppt' },
  { name: 'tugas' }
]), (req, res) => {
  try {
    const gambarPath = req.files['foto'] ? `/uploads/${req.files['foto'][0].filename}` : null;
    const modulPath = req.files['modul'] ? `/uploads/${req.files['modul'][0].filename}` : null;
    const pptPath = req.files['ppt'] ? `/uploads/${req.files['ppt'][0].filename}` : null;
    const tugasPath = req.files['tugas'] ? `/uploads/${req.files['tugas'][0].filename}` : null;

    if (!gambarPath && !modulPath && !pptPath && !tugasPath) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    return res.status(200).json({
      gambar: gambarPath,
      modul: modulPath,
      ppt: pptPath,
      tugas: tugasPath
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: 'Upload failed.' });
  }
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

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password harus diisi' });
  }

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

    const newProfile = await prisma.profile.create({
      data: {
        userId: newUser.id,
        username: username, 
        kelas: '', // Atau ambil dari input jika ada
        jurusan: '', // Atau ambil dari input jika ada
        foto: null, // Atau ambil dari input jika ada
      },
    });

    res.status(201).json({ message: 'Registrasi berhasil', user: newUser, profile: newProfile });
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

    res.status(200).json({ message: 'Login berhasil', token, role: user.role, id: user.id });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ error: 'Gagal login' });
  }
});

app.get('/api/admin/dashboard', authenticated, (req, res) => {
  res.status(200).json({ message: 'Selamat datang di dashboard admin!' });
});

app.post("/api/profile", authenticated, upload.single("foto"), async (req, res) => {
  // Ambil data dari request body dan file yang diupload
  console.log("Request body:", req.body); // Menampilkan request body di console

  const { nama, kelas, jurusan } = req.body;
  const fotoPath = req.file ? `/images/${req.file.filename}` : null; // Jika ada file, ambil path file

  try {
    // Verifikasi apakah pengguna sudah terotentikasi dan memiliki ID
    if (!req.headers.user || !req.headers.user.id) {
      return res.status(401).json({ error: 'User tidak terotentikasi' });
    }

    // Perbarui atau buat profil baru dengan menggunakan upsert
    const updatedProfile = await prisma.profile.upsert({
      where: { userId: req.headers.user.id }, // Gunakan ID pengguna dari token (pastikan token valid)
      update: {
        username: nama,
        kelas,
        jurusan,
        foto: fotoPath || undefined, // Perbarui hanya jika ada foto baru
      },
      create: {
        userId: req.headers.user.id, // Buat profil baru jika belum ada
        username: nama,
        kelas,
        jurusan,
        foto: fotoPath, // Masukkan foto jika ada
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: req.headers.user.id },
      data: {
        username: nama,
        password: req.headers.user.password, // Pastikan untuk tidak mengubah password
      },
    });

    res.status(200).json([
      updatedProfile,
      updatedUser,
    ]); // Kembalikan data profil yang diperbarui
  } catch (error) {
    console.error("Error saat menyimpan profil:", error);
    res.status(500).json({ error: "Gagal menyimpan profil" });
  }
});

app.get("/api/profile", authenticated, async (req, res) => {
  try {
    // Ambil token dari header Authorization
    console.log("headers req di line 354", req.headers); // Menampilkan user di console
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    // Verifikasi token dan ambil payload (userId)
    // const decoded = jwt.verify(token, SECRET_KEY);
    const userId = req.headers.user.id; // Asumsikan bahwa id ada di dalam payload

    // Ambil profile pengguna berdasarkan userId
    const profile = await prisma.profile.findUnique({
      where: { id: userId }, // Gunakan userId, bukan id
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil tidak ditemukan" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error saat mengambil profil:", error);
    res.status(500).json({ error: "Gagal mengambil profil" });
  }
});