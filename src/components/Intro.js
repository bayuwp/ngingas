import { Container, Button } from "react-bootstrap";

const KampungLogam = () => {
  return (
    <div className="kampung-logam-page" style={{
      backgroundImage: "url('https://source.unsplash.com/1600x900/?factory,metal')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff"
    }}>
      <Container>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", letterSpacing: "2px" }}>Desa Ngingas:<br />Kampung Logam</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", padding: "10px", borderRadius: "12px" }}>
          Jelajahi potensi Desa Ngingas, di mana tangan terampil membentuk logam menjadi karya penuh inspirasi, dari peralatan rumah tangga hingga ornamen unik yang berkelas.
        </p>
        <Button style={{ backgroundColor: "#006400", border: "none", padding: "10px 20px", borderRadius: "20px", fontWeight: "600" }}>
          JELAJAHI
        </Button>
      </Container>
    </div>
  );
};

export default KampungLogam;
