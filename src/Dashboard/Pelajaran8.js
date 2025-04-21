import React from 'react';
import Sidebar from '../pages/Sidebar'; // ✅ Benar

const Pelajaran1 = () => {
  return (
    <div className="d-flex">
      {/* Sidebar muncul di sebelah kiri */}
      <Sidebar />

      {/* Konten utama */}
      <div className="p-6 bg-white flex-grow-1 min-vh-100">
        {/* Judul */}
        <h1 className="text-2xl font-semibold mb-4">
          [2024 - G1] Filosofi Pendidikan Indonesia PGSD 1 15197
        </h1>

        {/* Gambar Header */}
        <div className="mb-6">
          <img
            src="/path-to-your-image.png" // Ganti path sesuai file kamu
            alt="Filosofi Pendidikan Indonesia"
            className="rounded-md w-full max-w-3xl"
          />
        </div>

        {/* Deskripsi */}
        <p className="text-gray-700 max-w-4xl mb-4">
          Mata kuliah ini mencakup sikap, pengetahuan, dan keterampilan mahasiswa dalam
          memaknai dan menghargai dasar-dasar Pendidikan Ki Hajar Dewantara (KHD)...
        </p>

        <p className="text-gray-700 max-w-4xl mb-6">
          Proses perkuliahan dilakukan dengan menekankan dialog kritis...
        </p>

        {/* Link Bahan Bacaan */}
        <ul className="list-disc pl-6 text-blue-600 mb-8">
          <li><a href="#">Bahan Bacaan (Modul)</a></li>
          <li><a href="#">Bahan Bacaan (PPT)</a></li>
        </ul>

        {/* Tombol Topik */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-xl">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="bg-blue-600 text-white py-4 rounded-md shadow hover:bg-blue-700"
            >
              Topik {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pelajaran1;
