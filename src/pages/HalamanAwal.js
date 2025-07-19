import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Carousel } from "react-bootstrap";
import slide1 from '../assets/images/bg/slide.jpg';
import slide2 from '../assets/images/bg/slide2.jpg';
import slide3 from '../assets/images/bg/slide3.jpg';

const HalamanAwal = () => {
  return (
    <div>
      {/* Hero Section: Carousel dengan Teks di Depan */}
      <div style={{ position: "relative", width: "100%", height: "650px", marginBottom: "32px" }}>
        <Carousel fade interval={3000} controls={false} indicators={false} style={{ height: "650px" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide1}
              alt="Slide 1"
              style={{ objectFit: "cover", height: "650px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide2}
              alt="Slide 2"
              style={{ objectFit: "cover", height: "650px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide3}
              alt="Slide 3"
              style={{ objectFit: "cover", height: "650px" }}
            />
          </Carousel.Item>
        </Carousel>
        {/* Overlay teks di tengah carousel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            background: "rgba(0,0,0,0.35)",
            textAlign: "center",
            zIndex: 2,
            pointerEvents: "none" // agar klik tetap ke carousel
          }}
        >
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            letterSpacing: "2px",
            marginBottom: "16px"
          }}>
            Desa Ngingas:<br />Kampung Logam
          </h1>
          <p style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto 16px auto",
            padding: "10px",
            borderRadius: "12px",
            backgroundColor: "rgba(0,0,0,0.25)",
            display: "inline-block"
          }}>
            Jelajahi potensi Desa Ngingas, di mana tangan terampil membentuk logam menjadi karya penuh inspirasi, dari peralatan rumah tangga hingga ornamen unik yang berkelas.
          </p>
          <Button
            style={{
              backgroundColor: "#006400",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "600",
              marginTop: "12px",
              pointerEvents: "auto" // agar tombol bisa diklik
            }}
          >
            JELAJAHI
          </Button>
        </div>
      </div>

      {/* Bagian Kampung Logam */}

      <Container>
          <Row>
            {[
              {
                title: "Pusat Kerajinan Logam",
                text: "Dikenal sebagai pusat kerajinan logam dengan teknik yang diwariskan dari generasi ke generasi.",
                icon: "🛠️"
              },
              {
                title: "Komunitas Pengrajin Solid",
                text: "Memiliki komunitas pengrajin solid yang saling berbagi keterampilan untuk meningkatkan kualitas produk.",
                icon: "🤝"
              },
              {
                title: "Jaringan Kerja Sama",
                text: "Masyarakat aktif menjalin kerja sama dengan berbagai lembaga dan organisasi untuk meningkatkan keterampilan dan pemasaran produk.",
                icon: "🌐"
              }
            ].map((card, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card style={{ backgroundColor: "#212529", color: "#fff", borderRadius: "12px", height: "100%" }}>
                  <Card.Body>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{
                        backgroundColor: "#28a745",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "10px"
                      }}>
                        <span style={{ fontSize: "24px" }}>{card.icon}</span>
                      </div>
                      <div>
                        <Card.Title style={{ fontWeight: "bold" }}>{card.title}</Card.Title>
                        <Card.Text style={{ textAlign: "justify" }}>{card.text}</Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <img src={slide2} alt="Desa Ngingas" style={{ width: "100%", borderRadius: "12px" }} />
            </Col>
            <Col md={6}>
              <h2 style={{ fontWeight: "bold" }}>Sejarah Desa Ngingas</h2>
              <p style={{ textAlign: "justify" }}>
                Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, dikenal sebagai "Kampung Logam". Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam. Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga dan kebutuhan industri.
              </p>
              <p style={{ textAlign: "justify" }}>
                Hampir seluruh warga Desa Ngingas menggeluti industri kerajinan logam, menjadikannya sebagai pusat ekonomi yang berbasis keterampilan logam. Awal mula industri logam di Desa Ngingas berasal dari usaha kecil-kecilan yang ditekuni oleh warga setempat secara turun-temurun. Pada era 1980-an, kerajinan logam di desa ini mulai berkembang pesat.
              </p>
            </Col>
          </Row>
        </Container>

      {/* Bagian Lokasi Desa Ngingas */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "50px 0", marginTop: "60px" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 style={{ color: "#28a745", fontWeight: "bold" }}>GEOGRAFI</h3>
              <h2 style={{ fontWeight: "bold" }}>Lokasi Desa Ngingas</h2>
              <p>
                Desa Ngingas terletak di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur.
                Lokasi ini mudah diakses menjadikannya tempat yang strategis bagi pengunjung.
              </p>
              <Button style={{ backgroundColor: "#28a745", border: "none", padding: "10px 20px", borderRadius: "20px", fontWeight: "600" }}>KUNJUNGI</Button>
            </Col>
            <Col md={6}>
              <iframe
                title="Lokasi Desa Ngingas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8571041963295!2d112.74709887404741!3d-7.142395669826746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb155555!2sNgingas,%20Waru,%20Sidoarjo%20Regency,%20East%20Java!5e0!3m2!1sen!2sid!4v1710000000000"
                width="100%"
                height="300"
                style={{ borderRadius: "12px", border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Footer */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "20px 0", textAlign: "center" }}>
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
          <p style={{ fontSize: "14px" }}>ⓒ Amrozenk - Universitas Negeri Surabaya</p>
        </Container>
      </div>
    </div>
  );
};

export default HalamanAwal;
