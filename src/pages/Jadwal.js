import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import moment from "moment";
import Sidebar from "./Sidebar"; // pastikan path-nya benar

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "[2024 - G1] Pembelajaran Berdiferensiasi PGSD 1 15197",
    start: new Date(2025, 3, 6),
    end: new Date(2025, 3, 6),
  },
  {
    title: "[2024 - G1] Perspektif Sosiokultural dalam Pendidikan Indonesia PGSD 1 15197",
    start: new Date(2025, 3, 6),
    end: new Date(2025, 3, 6),
  },
  {
    title: "[2024 - G1] PPKS (Pencegahan dan Penanganan Kekerasan Seksual) PGSD 1 15197",
    start: new Date(2025, 3, 6),
    end: new Date(2025, 3, 6),
  },
];

const Jadwal = () => {
  const [date, setDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar kiri */}
      {!isMobile && <Sidebar />}

      {/* Konten utama */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flex: 1,
          padding: "20px",
          gap: "20px",
          backgroundColor: "#fafafa",
          boxSizing: "border-box",
        }}
      >
        {/* Kalender utama */}
        <div style={{ flex: 3 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            defaultDate={new Date(2025, 3, 6)}
            style={{
              height: "100%",
              minHeight: "600px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Sidebar kanan */}
        <div
          style={{
            flex: 1,
            maxWidth: "320px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>{format(date, "MMMM yyyy")}</h4>
          <DatePicker selected={date} onChange={(date) => setDate(date)} inline />

          <h5 style={{ marginTop: "20px" }}>📌 CALENDARS</h5>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {events.map((event, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <span style={{ color: "green", fontWeight: "bold" }}>■ </span>
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;
