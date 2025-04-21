import { Container, Row, Col, Card } from "react-bootstrap";

const TentangDesa = () => {
  return (
    <Container style={{ padding: "50px 20px" }}>
      {/* Sekilas Mengenai Desa Ngingas */}
      <Row className="mb-5">
        <Col>
          <h2 style={{ fontWeight: "bold", color: "#1a1a1a" }}>Sekilas Mengenai Desa Ngingas</h2>
          <p style={{ textAlign: "justify", lineHeight: "1.6" }}>
            Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, terkenal sebagai "Kampung Logam".
            Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam.
            Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga
            dan kebutuhan industri. Produk-produk dari Desa Ngingas tidak hanya melayani kebutuhan lokal tetapi juga menjangkau
            berbagai daerah di Indonesia dan bahkan diekspor ke pasar internasional.
          </p>
        </Col>
      </Row>

      {/* Visi Desa Ngingas */}
      <Row className="mb-4">
        <Col>
          <h2 style={{ fontWeight: "bold", color: "#1a1a1a" }}>Visi Desa Ngingas</h2>
          <p style={{ fontStyle: "italic", textAlign: "justify", lineHeight: "1.6" }}>
            Menjadi desa mandiri dan inovatif dengan komunitas pengrajin logam yang unggul serta mampu bersaing di tingkat nasional dan internasional.
          </p>
        </Col>
      </Row>

      {/* Misi Desa Ngingas */}
      <Row>
        <Col>
          <h2 style={{ fontWeight: "bold", color: "#1a1a1a" }}>Misi Desa Ngingas</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li>Meningkatkan keterampilan dan pengetahuan warga melalui pelatihan dan workshop berkala.</li>
            <li>Mendorong partisipasi aktif masyarakat dalam kegiatan pengembangan desa.</li>
            <li>Mengembangkan produk-produk logam berkualitas tinggi dengan sentuhan inovasi modern.</li>
            <li>Menjalin kerja sama dengan berbagai pihak untuk mendukung pemasaran dan pengembangan produk.</li>
            <li>Memperbaiki dan membangun fasilitas umum untuk mendukung aktivitas ekonomi dan sosial warga desa.</li>
          </ul>
        </Col>
      </Row>

      {/* Lokasi dan Kontak */}
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
          <h3 style={{ fontWeight: "bold" }}>Lokasi</h3>
          <p>
            Desa Ngingas terletak di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur.
            Lokasi ini mudah diakses menjadikannya tempat yang strategis bagi pengunjung.
          </p>
          <h3 style={{ fontWeight: "bold" }}>Kontak</h3>
          <p>0318535437</p>
          <h3 style={{ fontWeight: "bold" }}>Sosial Media</h3>
          <p>Instagram: <a href="https://instagram.com/kampunglogam" target="_blank" rel="noopener noreferrer">@kampunglogam</a></p>
        </Col>
      </Row>

      {/* Pengurus Desa Ngingas */}
      <div style={{ backgroundColor: "#0a8f3d", padding: "50px 0", marginTop: "50px", color: "#fff", textAlign: "center" }}>
        <h2 style={{ fontWeight: "bold" }}>Pengurus Desa Ngingas</h2>
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
                    <Card.Title style={{ fontWeight: "bold" }}>{person.name}</Card.Title>
                    <Card.Text>{person.role}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default TentangDesa;
