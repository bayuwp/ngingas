import React from "react";
import slide2 from "../assets/images/bg/slide2.jpg";
import bg1 from "../assets/images/bg/bg1.jpg"; // Tambahkan di bagian atas
import { Container, Row, Col, Card } from "react-bootstrap"; // Tambahkan ini
import { Link } from "react-router-dom"; // Tambahkan import ini di bagian atas

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
          <p style={{ fontSize: "1.2rem", margin: 0 }}>
            <Link to="/halaman-awal" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>Home</Link>
            {" | "}
            <Link to="/tentang-desa" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>Tentang Desa</Link>
          </p>
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
      <Container className="my-5">
        <Row className="align-items-center g-4">
          <Col md={7}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "18px", background: "#fff" }}>
              <Card.Body>
                <h2 className="fw-bold mb-3" style={{ color: "#222" }}>Sekilas Mengenai Desa Ngingas</h2>
                <p style={{ color: "#444", fontSize: "1.08rem", textAlign: "justify" }}>
                  Desa Ngingas, yang berada di Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur, terkenal sebagai <b>"Kampung Logam"</b>.
                  Nama ini bukan sekadar julukan, karena Desa Ngingas telah lama menjadi pusat kerajinan logam yang sangat mendalam.
                  Sejak puluhan tahun lalu, desa ini sudah dikenal sebagai penghasil berbagai produk logam, khususnya peralatan rumah tangga dan kebutuhan industri.
                  Hampir seluruh warga Desa Ngingas menggeluti industri kerajinan logam, menjadikannya sebagai pusat ekonomi yang berbasis keterampilan logam.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow border-0" style={{ borderRadius: "18px", background: "#e9f7ef" }}>
              <Card.Body>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "#222",
                      color: "#fff",
                      fontSize: 18,
                      marginRight: 10,
                      boxShadow: "0 2px 8px rgba(40,167,69,0.13)"
                    }}
                  >
                    <i className="bi bi-info-circle"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: "#222" }}>Fakta Singkat</h5>
                </div>
                <ul style={{ color: "#555", fontSize: "1rem", paddingLeft: 18, marginBottom: 0 }}>
                  <li>Sentra kerajinan logam sejak 1980-an</li>
                  <li>Mayoritas penduduk pengrajin logam</li>
                  <li>Produk: rumah tangga, industri, otomotif</li>
                  <li>Komunitas pengrajin solid & inovatif</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Visi Misi */}
      <Container className="my-5">
        <Row className="g-4 flex-column">
          <Col md={12}>
            <Card
              className="shadow-sm border-0 mb-4"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(120deg, #e9f7ef 80%, #fff 180%)",
                boxShadow: "0 4px 24px rgba(40,167,69,0.08)",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Card.Body>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#222",
                      color: "#fff",
                      fontSize: 24,
                      marginRight: 14,
                      boxShadow: "0 2px 8px rgba(40,167,69,0.13)"
                    }}
                  >
                    <i className="bi bi-lightbulb"></i>
                  </span>
                  <h3 className="fw-bold mb-0" style={{ color: "#222", fontSize: "1.4rem" }}>Visi Desa Ngingas</h3>
                </div>
                <p style={{ color: "#444", fontSize: "1.08rem", marginBottom: 0 }}>
                  Menjadi desa mandiri dan inovatif dengan komunitas pengrajin logam yang unggul serta mampu bersaing di tingkat nasional dan internasional.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card
              className="shadow-sm border-0"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(120deg, #fff 80%, #e9f7ef 180%)",
                boxShadow: "0 4px 24px rgba(40,167,69,0.08)",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Card.Body>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#222",
                      color: "#fff",
                      fontSize: 24,
                      marginRight: 14,
                      boxShadow: "0 2px 8px rgba(40,167,69,0.13)"
                    }}
                  >
                    <i className="bi bi-list-check"></i>
                  </span>
                  <h3 className="fw-bold mb-0" style={{ color: "#222", fontSize: "1.4rem" }}>Misi Desa Ngingas</h3>
                </div>
                <ol style={{ color: "#444", fontSize: "1.08rem", paddingLeft: 20, marginBottom: 0 }}>
                  <li style={{ marginBottom: 6 }}>Meningkatkan keterampilan dan pengetahuan warga melalui pelatihan dan workshop berkala.</li>
                  <li style={{ marginBottom: 6 }}>Mendorong partisipasi aktif masyarakat dalam kegiatan pengembangan desa.</li>
                  <li style={{ marginBottom: 6 }}>Mengembangkan produk-produk logam berkualitas tinggi dengan sentuhan inovasi modern.</li>
                  <li style={{ marginBottom: 6 }}>Menjalin kerja sama dengan berbagai pihak untuk mendukung pemasaran dan pengembangan produk.</li>
                  <li>Memperbaiki dan membangun fasilitas umum untuk mendukung aktivitas ekonomi dan sosial warga desa.</li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Lokasi dan Kontak */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "16px", height: "100%" }}>
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
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "16px", height: "100%" }}>
              <Card.Body>
                <h4 className="fw-bold mb-3" style={{ color: "#222" }}>Kontak & Sosial Media</h4>
                <div style={{ marginBottom: 16 }}>
                  <strong>Lokasi:</strong>
                  <div>Desa Ngingas, Kec. Waru, Kab. Sidoarjo, Jawa Timur</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>Telepon:</strong>
                  <div>031-8535477</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>Email:</strong>
                  <div>desangingas@gmail.com</div>
                </div>
                <div>
                  <strong>Sosial Media:</strong>
                  <div>
                    <a href="https://instagram.com/kampunglogam" target="_blank" rel="noopener noreferrer" style={{ color: "#28a745", textDecoration: "none", fontWeight: 500 }}>
                      <i className="bi bi-instagram" style={{ marginRight: 6 }}></i>@kampunglogam
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

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
