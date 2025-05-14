import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = 'your_secret_key'; // Ganti dengan secret key yang sesuai

const authenticateToken = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan atau format salah.' });
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Cari user di database berdasarkan ID dari token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    // Cek apakah user memiliki role admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Akses ditolak. Anda bukan admin.' });
    }

    // Simpan user ke request untuk digunakan di controller
    req.user = user;
    next();
  } catch (error) {
    console.error('Error autentikasi:', error.message);
    return res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa.' });
  }
};

export default authenticateToken;
