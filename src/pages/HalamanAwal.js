import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Carousel } from "react-bootstrap";
import slide1 from '../assets/images/bg/slide.jpg';
import slide2 from '../assets/images/bg/slide2.jpg';
import slide3 from '../assets/images/bg/slide3.jpg';
import foto9 from '../assets/images/bg/foto9.jpg';
import foto5 from '../assets/images/bg/foto5.jpg';
import foto2 from '../assets/images/bg/foto2.jpg';
import foto3 from '../assets/images/bg/foto3.jpg';

const produkUnggulan = [
  {
    img: foto9,
    title: "Gedung Sekolah & Suasana Halaman",
    desc: "Lingkungan sekolah yang nyaman dan kondusif, menjadi rumah kedua bagi siswa untuk belajar, berkarya, dan berprestasi."
  },
  {
    img: foto5,
    title: "Siswa Upacara Pagi",
    desc: "Disiplin dan kebersamaan adalah fondasi utama dalam membentuk generasi siap kerja dan berkarakter."
  },
  {
    img: foto2,
    title: "Praktik Bengkel/Perakitan",
    desc: "Pembelajaran berbasis praktik, didampingi guru berpengalaman, melatih keterampilan nyata yang dibutuhkan dunia industri."
  },
  {
    img: foto3,
    title: "Praktik Mesin Industri (CNC/Listrik)",
    desc: "Dilengkapi fasilitas modern dan peralatan industri, siswa dilatih menguasai teknologi terbaru untuk menghadapi tantangan masa depan."
  }
];

const HalamanAwal = () => {
  return (
    <div style={{ fontFamily: "'Roboto', Arial, sans-serif", background: "#f8f9fa" }}>
      {/* Hero Section */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "650px",
        marginBottom: "32px",
        borderRadius: "0 0 32px 32px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(40,167,69,0.08)"
      }}>
        <Carousel fade interval={3000} controls={false} indicators={false} style={{ height: "100%" }}>
          {[slide1, slide2, slide3].map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={img}
                alt={`Slide ${idx + 1}`}
                style={{ objectFit: "cover", height: "650px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
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
            background: "rgba(0,0,0,0.30)",
            textAlign: "center",
            zIndex: 2,
            pointerEvents: "none"
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              textShadow: "2px 2px 12px rgba(0,0,0,0.7)",
              letterSpacing: "2px",
              marginBottom: "18px",
              lineHeight: 1.1
            }}
          >
            Desa Ngingas:<br />Kampung Logam
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              maxWidth: "600px",
              margin: "0 auto 18px auto",
              padding: "12px 18px",
              borderRadius: "16px",
              backgroundColor: "rgba(0,0,0,0.22)",
              display: "inline-block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
            }}
          >
            Jelajahi potensi Desa Ngingas, di mana tangan terampil membentuk logam menjadi karya penuh inspirasi, dari peralatan rumah tangga hingga ornamen unik yang berkelas.
          </p>
          <Button
            style={{
              background: "linear-gradient(90deg,#28a745 60%,#218838 100%)",
              border: "none",
              padding: "12px 32px",
              borderRadius: "24px",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginTop: "12px",
              pointerEvents: "auto",
              boxShadow: "0 2px 8px rgba(40,167,69,0.15)"
            }}
          >
            JELAJAHI
          </Button>
        </div>
      </div>

      {/* Bagian Kampung Logam */}
      <Container className="py-5">
        <Row className="mb-5">
          {
          [{
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
          }].map((card, index) => (
            <Col xs={12} md={4} key={index} className="mb-4">
              <Card
                className="h-100 shadow-sm border-0"
                style={{
                  background: "linear-gradient(120deg,#212529 80%,#28a745 180%)",
                  color: "#fff",
                  borderRadius: "18px",
                  transition: "transform 0.2s",
                  boxShadow: "0 2px 12px rgba(40,167,69,0.07)"
                }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"}
                onMouseOut={e => e.currentTarget.style.transform = "none"}
              >
                <Card.Body>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      backgroundColor: "#28a745",
                      borderRadius: "50%",
                      width: "54px",
                      height: "54px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "16px",
                      boxShadow: "0 2px 8px rgba(40,167,69,0.15)",
                      lineHeight: "54px",
                      padding: 0
                    }}>
                      <span style={{
                        fontSize: "2rem",
                        lineHeight: "1",
                        display: "block",
                        fontFamily: "'Roboto', Arial, sans-serif"
                      }}>{card.icon}</span>
                    </div>
                    <div>
                      <Card.Title style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 6 }}>{card.title}</Card.Title>
                      <Card.Text style={{ textAlign: "justify", fontSize: "1rem", opacity: 0.92 }}>{card.text}</Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-5 align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <img src={slide2} alt="Desa Ngingas" style={{
              width: "100%",
              borderRadius: "16px",
              objectFit: "cover",
              minHeight: "180px",
              maxHeight: "340px",
              boxShadow: "0 2px 12px rgba(40,167,69,0.10)"
            }} />
          </Col>
          <Col xs={12} md={6}>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}>Sejarah Desa Ngingas</h2>
            <p style={{ textAlign: "justify", fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>
              Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, dikenal sebagai "Kampung Logam". Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam. Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga dan kebutuhan industri.
            </p>
            <p style={{ textAlign: "justify", fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>
              Hampir seluruh warga Desa Ngingas menggeluti industri kerajinan logam, menjadikannya sebagai pusat ekonomi yang berbasis keterampilan logam. Awal mula industri logam di Desa Ngingas berasal dari usaha kecil-kecilan yang ditekuni oleh warga setempat secara turun-temurun. Pada era 1980-an, kerajinan logam di desa ini mulai berkembang pesat.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Bagian Lokasi Desa Ngingas */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "50px 0", marginTop: "60px" }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <h3 style={{ color: "#28a745", fontWeight: "bold" }}>GEOGRAFI</h3>
              <h2 style={{ fontWeight: "bold" }}>Lokasi Desa Ngingas</h2>
              <p>
                Desa Ngingas terletak di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur.
                Lokasi ini mudah diakses menjadikannya tempat yang strategis bagi pengunjung.
              </p>
              <Button style={{
                backgroundColor: "#28a745",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                fontWeight: "600"
              }}>KUNJUNGI</Button>
            </Col>
            <Col xs={12} md={6}>
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

      {/* Produk Unggulan Desa Ngingas */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-success fw-semibold text-uppercase" style={{ letterSpacing: 2 }}>SMK Negeri 3 Surabaya </h6>
            <h2 className="fw-bold" style={{ fontSize: "2.2rem" }}>KEGIATAN</h2>
            <p className="text-muted" style={{ maxWidth: 600, margin: "12px auto 0 auto" }}>
              Kegiatan Siswa SMK 3 Surabaya, siap memenuhi kebutuhan rumah tangga, industri, hingga otomotif.
            </p>
          </div>
          <Row className="g-4">
            {produkUnggulan.map((produk, idx) => (
              <Col xs={12} md={6} lg={3} key={idx}>
                <Card
                  className="h-100 shadow-sm border-0"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    background: "#fff"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(40,167,69,0.13)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(40,167,69,0.07)";
                  }}
                >
                  <div style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "14px 14px 0 0"
                  }}>
                    <img
                      src={produk.img}
                      alt={produk.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <Card.Body className="px-2 py-3 d-flex flex-column align-items-center">
                    <h5 className="fw-bold text-center" style={{ color: "#28a745", fontSize: "1.15rem", marginBottom: 8 }}>{produk.title}</h5>
                    <p className="text-muted small text-center mb-0" style={{ minHeight: 48 }}>{produk.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Footer */}
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "20px 0", textAlign: "center" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <p><strong style={{ color: "#28a745" }}>Lokasi:</strong><br />Desa Ngingas, Waru, Sidoarjo</p>
            </Col>
            <Col xs={12} md={4}>
              <p><strong style={{ color: "#28a745" }}>Email:</strong><br />desangingas@gmail.com</p>
            </Col>
            <Col xs={12} md={4}>
              <p><strong style={{ color: "#28a745" }}>Hubungi Kami:</strong><br />+62318412886</p>
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
