import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

const MessagePanel = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("All courses");
  const [messageCategory, setMessageCategory] = useState("Inbox");

  return (
    <div className="d-flex">
      {/* ✅ Gunakan Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <Container fluid className="p-3">
        {/* Header */}
        <Row className="mb-3">
          <Col md={6}>
            <Dropdown>
              <Dropdown.Toggle variant="light">{selectedCourse}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCourse("All courses")}>All courses</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCourse("Course A")}>Course A</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCourse("Course B")}>Course B</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6} className="text-end">
            <Dropdown>
              <Dropdown.Toggle variant="light">{messageCategory}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setMessageCategory("Inbox")}>Inbox</Dropdown.Item>
                <Dropdown.Item onClick={() => setMessageCategory("Sent")}>Sent</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Message Panel */}
        <Row className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
          <Col md={6} className="text-center">
            <FaEnvelope size={60} className="text-muted" />
            <h5 className="text-muted">No conversations selected</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagePanel;
