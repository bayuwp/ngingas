import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import tulisanDesa from '../assets/images/bg/tulisandesa.jpg';

const TentangDesa = () => {
  return (
    <>
       {/* Header dengan background gelap dan lingkaran hijau */}
       <div className="position-relative bg-dark text-white py-5">
        <div className="green-circle"></div>
        <Container className="position-relative z-1">
          <h1 className="fw-bold mb-1">Tentang Desa</h1>
          <p className="text-white-50 small">
            <Link to="/" className="text-white-50 text-decoration-none">Home</Link> | Tentang Desa
          </p>
        </Container>
      </div>

      {/* Konten utama */}
      <Container style={{ padding: "50px 20px" }}>
        {/* Gambar Utama */}
        <div className="max-w-6xl mx-auto mt-4 mb-5">
          <img
            src={tulisanDesa}
            alt="Kampung Logam Desa Ngingas"
            className="rounded shadow w-100"
          />
        </div>

        {/* Sekilas Desa */}
        <Row className="mb-5">
          <Col>
            <h2 className="fw-bold text-dark">Sekilas Mengenai Desa Ngingas</h2>
            <p style={{ textAlign: "justify", lineHeight: "1.6" }}>
              Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, terkenal sebagai "Kampung Logam".
              Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam.
              Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga
              dan kebutuhan industri. Produk-produk dari Desa Ngingas tidak hanya melayani kebutuhan lokal tetapi juga menjangkau
              berbagai daerah di Indonesia dan bahkan diekspor ke pasar internasional.
            </p>
          </Col>
        </Row>

        {/* Visi */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-dark">Visi Desa Ngingas</h2>
            <p className="fst-italic" style={{ textAlign: "justify", lineHeight: "1.6" }}>
              Menjadi desa mandiri dan inovatif dengan komunitas pengrajin logam yang unggul serta mampu bersaing di tingkat nasional dan internasional.
            </p>
          </Col>
        </Row>

        {/* Misi */}
        <Row>
          <Col>
            <h2 className="fw-bold text-dark">Misi Desa Ngingas</h2>
            <ul style={{ lineHeight: "1.8" }}>
              <li>Meningkatkan keterampilan dan pengetahuan warga melalui pelatihan dan workshop berkala.</li>
              <li>Mendorong partisipasi aktif masyarakat dalam kegiatan pengembangan desa.</li>
              <li>Mengembangkan produk-produk logam berkualitas tinggi dengan sentuhan inovasi modern.</li>
              <li>Menjalin kerja sama dengan berbagai pihak untuk mendukung pemasaran dan pengembangan produk.</li>
              <li>Memperbaiki dan membangun fasilitas umum untuk mendukung aktivitas ekonomi dan sosial warga desa.</li>
            </ul>
          </Col>
        </Row>

        {/* Lokasi & Kontak */}
        <Row className="mt-5">
          <Col md={6}>
            <iframe
              title="Lokasi Desa Ngingas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8571041963295!2d112.74709887404741!3d-7.142395669826746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb155555!2sNgingas,%20Waru,%20Sidoarjo%20Regency,%20East%20Java!5e0!3m2!1sen!2sid!4v1710000000000"
              width="100%"
              height="300"
              style={{ borderRadius: "12px", border: "none" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
          <Col md={6}>
            <h3 className="fw-bold">Lokasi</h3>
            <p>
              Desa Ngingas terletak di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur.
              Lokasi ini mudah diakses menjadikannya tempat yang strategis bagi pengunjung.
            </p>
            <h3 className="fw-bold">Kontak</h3>
            <p>0318535437</p>
            <h3 className="fw-bold">Sosial Media</h3>
            <p>Instagram: <a href="https://instagram.com/kampunglogam" target="_blank" rel="noopener noreferrer">@kampunglogam</a></p>
          </Col>
        </Row>

        {/* Pengurus Desa */}
        <div style={{ backgroundColor: "#0a8f3d", padding: "50px 0", marginTop: "50px", color: "#fff", textAlign: "center" }}>
          <h2 className="fw-bold">Pengurus Desa Ngingas</h2>
          <Container>
            <Row className="justify-content-center mt-4">
              {[
                { name: "MUHAMMAD ROIS", role: "Kepala Dusun Pandean-Dukuh Ngingas", img: "/path/to/user-icon.png" },
                { name: "H. SAMI’AN, S.Pd", role: "Kepala Desa Ngingas", img: "/path/to/profile-image.jpg" }
              ].map((person, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card style={{ backgroundColor: "#fff", color: "#000", borderRadius: "12px", textAlign: "center" }}>
                    <Card.Body>
                      <img
                        src={person.img}
                        alt={person.name}
                        style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "10px" }}
                      />
                      <Card.Title className="fw-bold">{person.name}</Card.Title>
                      <Card.Text>{person.role}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Container>

      {/* Footer */}
      <div style={{ backgroundColor: "#141414", color: "#fff", textAlign: "center", padding: "30px 0" }}>
        <Container>
          <Row>
            <Col md={4}>
              <p><strong style={{ color: "#28a745" }}>Lokasi:</strong><br />Desa Ngingas, Waru, Sidoarjo</p>
            </Col>
            <Col md={4}>
              <p><strong style={{ color: "#28a745" }}>Email:</strong><br />desangingas@gmail.com</p>
            </Col>
            <Col md={4}>
              <p><strong style={{ color: "#28a745" }}>Hubungi Kami:</strong><br />0318535447</p>
            </Col>
          </Row>
          <hr style={{ borderColor: "#444" }} />
          <p style={{ fontSize: "14px" }}>Copyright © 2025 | EduLogamSMK</p>
        </Container>
      </div>
    </>
  );
};

export default TentangDesa;
