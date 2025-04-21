import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

const courses = [
  { title: "Filosofi Pendidikan Indonesia", code: "01.01.2", category: "Pelajaran 1", status: "Siswa", route: "/pelajaran1" },
  { title: "Pembelajaran Berdiferensiasi", code: "SEL 07.2", category: "Pelajaran 2", status: "Siswa", route: "/pelajaran2" },
  { title: "Filosofi Pendidikan Indonesia", code: "01.01.2", category: "Pelajaran 3", status: "Siswa", route: "/pelajaran3" },
  { title: "Pembelajaran Berdiferensiasi", code: "SEL 07.2", category: "Pelajaran 4", status: "Siswa", route: "/pelajaran4" },
  { title: "Filosofi Pendidikan Indonesia", code: "01.01.2", category: "Pelajaran 5", status: "Siswa", route: "/pelajaran5" },
  { title: "Pembelajaran Berdiferensiasi", code: "SEL 07.2", category: "Pelajaran 6", status: "Siswa", route: "/pelajaran6" },
  { title: "Filosofi Pendidikan Indonesia", code: "01.01.2", category: "Pelajaran 7", status: "Siswa", route: "/pelajaran7" },
  { title: "Pembelajaran Berdiferensiasi", code: "SEL 07.2", category: "Pelajaran 8", status: "Siswa", route: "/pelajaran8" },
  { title: "Pembelajaran Berdiferensiasi", code: "SEL 07.2", category: "Pelajaran 9", status: "Siswa", route: "/pelajaran9" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAccount, setShowAccount] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Log out and navigate back to the home page
  };

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the appropriate Pelajaran page
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar onAccountClick={() => setShowAccount(!showAccount)} />

      {/* Main Content */}
      <div style={{ marginLeft: "70px", width: "100%" }}> {/* Adjust the margin to match sidebar width */}
        <Container fluid className="p-4">
          <h2 className="mb-4">Dashboard</h2>
          <Row>
            {courses.map((course, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card className="shadow-sm" onClick={() => handleCardClick(course.route)}>
                  <Card.Body className="bg-success text-white">
                    <Card.Subtitle>{course.category}</Card.Subtitle>
                    <Card.Title className="mt-2">{course.title}</Card.Title>
                    <span className="badge bg-warning text-dark">{course.code}</span>
                    <span className="badge bg-secondary ms-2">{course.status}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Account Details Popup */}
        {showAccount && (
          <div className="position-fixed top-0 end-0 bg-white shadow p-4" style={{ width: "300px", height: "100vh" }}>
            <h5 className="text-center">Catur Surya Saputra</h5>
            <Button variant="danger" className="w-100" onClick={handleLogout}>Log out</Button>
            <hr />
            <ul className="list-unstyled">
              <li>Notifications</li>
              <li>Files</li>
              <li>Settings</li>
              <li>ePortfolios</li>
              <li>Global Announcements</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
