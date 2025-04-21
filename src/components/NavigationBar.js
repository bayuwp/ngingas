import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const buttonStyle = {
    color: "black",
    backgroundColor: "transparent",
    padding: "8px 12px",
    border: "1px solid black",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "0 5px",
    textDecoration: "none",
  };

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "white",
          position: "fixed",
          width: "95%",
          top: "10px",
          left: "2.5%",
          zIndex: 1000,
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px",
        }}
        variant="light"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              EduLogamSMK
            </Link>
          </Navbar.Brand>
          <Nav>
            <Link to="/" style={buttonStyle}>Halaman Awal</Link>
            <Link to="/tentang-desa" style={buttonStyle}>Tentang Desa</Link>
            <Link to="/karya-siswa" style={buttonStyle}>Karya Siswa</Link>
            <Link to="/masuk" style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}>
              Masuk
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ paddingTop: "66px" }}></div>
    </div>
  );
};

export default NavigationBar;
