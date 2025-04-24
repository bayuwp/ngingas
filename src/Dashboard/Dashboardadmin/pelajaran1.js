import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="ml-[250px] p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        [2024 - G1] Filosofi Pendidikan Indonesia PGSD 1 15197
      </h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-6">
        <img
          src="/img/filosofi-banner.png"
          alt="Filosofi Pendidikan"
          className="w-1/3 rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Semester 1<br />
            01.01.2 Filosofi Pendidikan Indonesia
          </h2>
          <p className="text-gray-700">
            Mata kuliah ini mencakup sikap, pengetahuan, dan keterampilan mahasiswa dalam memaknai dan
            menghayati <strong>dasar-dasar Pendidikan KI Hajar Dewantara (KHD)</strong> sebagai sebuah filosofi pengembangan
            Pendidikan Nasional. Mata kuliah ini melatih mahasiswa untuk secara reflektif, kritis dan kolaboratif
            menelaah pemikiran-pemikiran KHD dan bagaimana strateginya dalam mewujudkan Pendidikan yang berpihak pada anak
            sesuai dengan keberagaman konteks sosial budaya dan nilai-nilai luhur Indonesia. Proses perkuliahan dilakukan
            dengan menekankan <strong>dialog kritis</strong> sehingga mahasiswa menjadi lebih reflektif dan tajam dalam mengkritisi
            praktik baik-praktik baik Pendidikan yang berpihak pada murid.
          </p>

          <div className="mt-4 space-x-4">
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              Bahan Bacaan (Modul)
            </a>
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              Bahan Bacaan (PPT)
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {['Topik 1', 'Topik 2', 'Topik 3'].map((topik, index) => (
          <button
            key={index}
            className="bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition shadow"
          >
            {topik}
          </button>
        ))}
      </div>
    </div>
  );
}
