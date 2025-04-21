import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaArrowLeft,
  FaBook,
  FaCalendar,
  FaClipboardList,
  FaQuestionCircle,
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onAccountClick }) => {
  const navigate = useNavigate();

  const iconStyle = {
    fontSize: "20px",
    transition: "transform 0.2s ease",
  };

  const hoverStyle = {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "12px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  return (
    <div
      className="sidebar d-flex flex-column align-items-center text-white"
      style={{
        width: "70px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #2ecc71, #27ae60)",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
        paddingTop: "20px",
        position: "fixed",
        zIndex: 999,
      }}
    >
      {/* Tombol Kembali */}
      <div
        className="text-center mb-4"
        style={hoverStyle}
        onClick={() => navigate(-1)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaArrowLeft style={iconStyle} />
        <p style={{ fontSize: "11px", margin: "0", marginTop: "4px" }}>Kembali</p>
      </div>

      <ul className="list-unstyled d-flex flex-column align-items-center w-100">
        <OverlayTrigger placement="right" overlay={<Tooltip>Dashboard</Tooltip>}>
          <li
            className="mb-4 w-100 text-center"
            style={hoverStyle}
            onClick={() => navigate("/dashboard")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaBook style={iconStyle} />
          </li>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Jadwal</Tooltip>}>
          <li
            className="mb-4 w-100 text-center"
            style={hoverStyle}
            onClick={() => navigate("/jadwal")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaCalendar style={iconStyle} />
          </li>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Tugas</Tooltip>}>
          <li
            className="mb-4 w-100 text-center"
            style={hoverStyle}
            onClick={() => navigate("/ujian")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaClipboardList style={iconStyle} />
          </li>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Pesan</Tooltip>}>
          <li
            className="mb-4 w-100 text-center"
            style={hoverStyle}
            onClick={() => navigate("/pesan")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaEnvelope style={{ ...iconStyle, color: "#f1c40f" }} />
          </li>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Bantuan</Tooltip>}>
          <li
            className="mb-4 w-100 text-center"
            style={hoverStyle}
            onClick={() => navigate("/bantuan")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaQuestionCircle style={iconStyle} />
          </li>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Akun</Tooltip>}>
          <li
            className="mt-auto w-100 text-center mb-3"
            style={hoverStyle}
            onClick={onAccountClick}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaUserCircle size={24} />
          </li>
        </OverlayTrigger>
      </ul>
    </div>
  );
};

export default Sidebar;
