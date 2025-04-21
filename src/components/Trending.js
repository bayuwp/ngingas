import { Card, Container, Row, Col } from "react-bootstrap"

const Trending = () => {
  const cardsData = [
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
  ]

  return (
    <div style={{ backgroundColor: "#f8f9fa", paddingTop: "50px" }}>
      <Container>
        <Row>
          {cardsData.map((card, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card style={{ backgroundColor: "#212529", color: "#fff", borderRadius: "12px", height: "100%" }}>
                <Card.Body>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#28a745", borderRadius: "50%", width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px" }}>
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
            <img src="/path/to/image.png" alt="Desa Ngingas" style={{ width: "100%", borderRadius: "12px" }} />
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
    </div>
  )
}

export default Trending