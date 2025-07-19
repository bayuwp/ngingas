import React from "react";
import slide2 from "../assets/images/bg/slide2.jpg";
import bg1 from "../assets/images/bg/bg1.jpg"; // Tambahkan di bagian atas
import { Container, Row, Col } from "react-bootstrap"; // Tambahkan ini

export default function TentangDesa() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section dengan Background */}
      <section
        className="relative"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "320px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            color: "#fff",
            padding: "32px 40px 24px 40px",
            borderBottomLeftRadius: "16px",
            borderTopRightRadius: "32px",
            maxWidth: "420px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 8 }}>Desa Ngingas</h1>
          <p style={{ fontSize: "1.2rem", margin: 0 }}>Home | Tentang Desa</p>
        </div>
      </section>

      {/* Image Banner */}
      <div className="container mx-auto px-4 mt-8">
        <img
          src={slide2}
          alt="Kampung Logam Desa Ngingas"
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Sekilas Tentang Desa */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Sekilas Mengenai Desa Ngingas</h2>
        <p className="text-gray-700 leading-relaxed">
          Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, terkenal sebagai "Kampung Logam".
          Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam.
          Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga dan kebutuhan industri. Hampir seluruh warga Desa Ngingas menggeluti industri kerajinan logam, menjadikannya sebagai pusat ekonomi yang berbasis keterampilan logam...
        </p>
      </section>

      {/* Visi Misi */}
      <section className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold mb-4">Visi Desa Ngingas</h2>
        <p className="text-gray-700 mb-6">
          Menjadi desa mandiri dan inovatif dengan komunitas pengrajin logam yang unggul serta mampu bersaing di tingkat nasional dan internasional.
        </p>

        <h2 className="text-2xl font-bold mb-4">Misi Desa Ngingas</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Meningkatkan keterampilan dan pengetahuan warga melalui pelatihan dan workshop berkala.</li>
          <li>Mendorong partisipasi aktif masyarakat dalam kegiatan pengembangan desa.</li>
          <li>Mengembangkan produk-produk logam berkualitas tinggi dengan sentuhan inovasi modern.</li>
          <li>Menjalin kerja sama dengan berbagai pihak untuk mendukung pemasaran dan pengembangan produk.</li>
          <li>Memperbaiki dan membangun fasilitas umum untuk mendukung aktivitas ekonomi dan sosial warga desa.</li>
        </ol>
      </section>

      {/* Lokasi dan Kontak */}
      <section className="container mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6">
        <div>
          <iframe
            title="Lokasi Desa Ngingas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8571041963295!2d112.74709887404741!3d-7.142395669826746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb155555!2sNgingas,%20Waru,%20Sidoarjo%20Regency,%20East%20Java!5e0!3m2!1sen!2sid!4v1710000000000"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">Lokasi</h3>
            <p className="text-gray-700">Desa Ngingas terletak di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Kontak</h3>
            <p className="text-gray-700">0318535477</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Sosial Media</h3>
            <a href="https://instagram.com/kampunglogam" className="text-green-700 hover:underline">@kampunglogam</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "20px 0", textAlign: "center" }}>
        <Container>
          <Row>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Lokasi:</strong><br />
                Desa Ngingas, Waru, Sidoarjo
              </p>
            </Col>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Email:</strong><br />
                desangingas@gmail.com
              </p>
            </Col>
            <Col md={4}>
              <p>
                <strong style={{ color: "#28a745" }}>Hubungi Kami:</strong><br />
                0318535447
              </p>
            </Col>
          </Row>
          <hr style={{ borderColor: "#444" }} />
          <p style={{ fontSize: "14px" }}>ⓒ Amrozenk - Universitas Negeri Surabaya</p>
        </Container>
      </div>
    </div>
  );
}
