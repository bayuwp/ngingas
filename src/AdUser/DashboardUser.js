import React, { useEffect, useState } from 'react';
import Sidebar from '../pages/Sidebar.js';

const DashboardUser = () => {
  const [materiList, setMateriList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/materi')
      .then(res => res.json())
      .then(data => setMateriList(data))
      .catch(err => console.error('Gagal mengambil data materi:', err));
  }, []);

  return (
    <div>
      <Sidebar />
      <main
        style={{
          marginLeft: '70px', // Lebar sidebar
          padding: '32px',
          background: '#f4f6f8',
          minHeight: '100vh',
        }}
      >
        <h1 style={{ marginBottom: '24px' }}>Daftar Materi</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {materiList.length === 0 ? (
            <p>Belum ada materi.</p>
          ) : (
            materiList.map(materi => (
              <div
                key={materi.id}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  padding: '20px',
                  minWidth: '260px',
                  maxWidth: '320px',
                  flex: '1 1 260px'
                }}
              >
                <h3 style={{ margin: '0 0 10px' }}>{materi.judul}</h3>
                <p style={{ margin: 0 }}>{materi.deskripsi}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardUser;