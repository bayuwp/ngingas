import React, { useState } from 'react';
import Sidebar from '../pages/Sidebar.js';

const PelajaranAdmin = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [modul, setModul] = useState(null);
  const [ppt, setPpt] = useState(null);
  const [tugas, setTugas] = useState(null);
  const [materiList, setMateriList] = useState([]);

  const handleFileChange = (event, setFile, isImage = false) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      if (isImage && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setGambarPreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = () => {
    const newMateri = {
      id: Date.now(),
      judul,
      deskripsi,
      linkVideo,
      namaModul: modul?.name || null,
      namaPpt: ppt?.name || null,
      namaTugas: tugas?.name || null,
    };
    setMateriList([...materiList, newMateri]);
    alert('Materi berhasil disimpan!');

    // Reset form
    setJudul('');
    setDeskripsi('');
    setLinkVideo('');
    setGambar(null);
    setGambarPreview(null);
    setModul(null);
    setPpt(null);
    setTugas(null);
  };

  const handleDelete = (id) => {
    const filtered = materiList.filter((m) => m.id !== id);
    setMateriList(filtered);
  };

  return (
    <div className="d-flex">
      <Sidebar />
  
      <div className="ml-24 p-6 bg-gray-50 flex-grow min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📚 Admin - Upload Materi Perkuliahan</h1>
  
        {/* Card Container */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 max-w-4xl">
          {/* Form Input */}
          <div className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Judul</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan Judul"
              />
            </div>
  
            <div>
              <label className="block font-semibold mb-1">Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setGambar, true)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {gambarPreview && (
                <img
                  src={gambarPreview}
                  alt="Preview"
                  className="mt-2 rounded-md w-full max-w-md"
                />
              )}
            </div>
  
            <div>
              <label className="block font-semibold mb-1">Deskripsi</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan deskripsi mata kuliah"
              ></textarea>
            </div>
  
            <div>
              <label className="block font-semibold mb-1">Link Video Pembelajaran</label>
              <input
                type="text"
                value={linkVideo}
                onChange={(e) => setLinkVideo(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://youtube.com/..."
              />
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Upload Modul (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, setModul)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload PPT</label>
                <input
                  type="file"
                  accept=".ppt,.pptx"
                  onChange={(e) => handleFileChange(e, setPpt)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">Upload Tugas</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, setTugas)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
  
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Simpan Materi
            </button>
          </div>
        </div>
  
        {/* Tabel Materi */}
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">📄 Daftar Materi</h2>
          <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="px-4 py-3 border">Judul</th>
                <th className="px-4 py-3 border">Deskripsi</th>
                <th className="px-4 py-3 border">Video</th>
                <th className="px-4 py-3 border">Modul</th>
                <th className="px-4 py-3 border">PPT</th>
                <th className="px-4 py-3 border">Tugas</th>
                <th className="px-4 py-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {materiList.map((materi, index) => (
                <tr key={materi.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-3 border">{materi.judul}</td>
                  <td className="px-4 py-3 border">{materi.deskripsi}</td>
                  <td className="px-4 py-3 border">
                    <a
                      href={materi.linkVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Video
                    </a>
                  </td>
                  <td className="px-4 py-3 border">{materi.namaModul || '-'}</td>
                  <td className="px-4 py-3 border">{materi.namaPpt || '-'}</td>
                  <td className="px-4 py-3 border">{materi.namaTugas || '-'}</td>
                  <td className="px-4 py-3 border text-center">
                    <button
                      onClick={() => handleDelete(materi.id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {materiList.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Belum ada materi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ); 
};



export default PelajaranAdmin;
