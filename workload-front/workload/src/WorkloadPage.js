// WorkloadPage.js
import React, { useState, useEffect } from "react";
import "./WorkloadPage.css";
import CalendarApp from "./calendar/CalendarApp";
import { useNavigate } from "react-router-dom";

export default function WorkloadPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/table"); // Navigate to the Subject Entry Page
  };

  const [summary, setSummary] = useState({
    total: 0,
    labs: 0,
    theory: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/table/getTable")
      .then((res) => res.json())
      .then((data) => {
        const labs = data.filter((entry) => entry.type === "Lab").length;
        const theory = data.filter((entry) => entry.type === "Theory").length;
        const total = data.length;

        setSummary({
          total,
          labs,
          theory,
        });
      })
      .catch((err) => console.error("Failed to fetch summary:", err));
  }, []);

  return (
    <div className="workload-container" style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f7fa" }}>
      
      {/* Header */}
<header className="workload-header bg-dark text-white py-3 px-4 shadow d-flex justify-content-center">
  <div className="d-flex align-items-center gap-3 text-center">
    {/* Logo */}
    <img
      src="wl.png"
      alt="Logo"
      style={{
        height: "110px",
        width: "auto",
        objectFit: "contain"
      }}
    />

    {/* Title */}
    <div>
      <h1 className="display-5 mb-0">📚 Workload Planner Dashboard</h1>
      <p className="lead mb-0">Manage your academic timetable efficiently and visually</p>
    </div>
  </div>
</header>


      {/* SCards */}
      <section className="summary-cards-container p-4 d-flex flex-wrap justify-content-between gap-3">
        <div className="summary-card shadow bg-white p-3 rounded flex-fill text-center">
          <h4 className="text-primary">Subjects This Week</h4>
          <p className="display-6 fw-bold">{summary.total}</p>
        </div>
        <div className="summary-card shadow bg-white p-3 rounded flex-fill text-center">
          <h4 className="text-success">Labs Scheduled</h4>
          <p className="display-6 fw-bold">{summary.labs}</p>
        </div>
        <div className="summary-card shadow bg-white p-3 rounded flex-fill text-center">
          <h4 className="text-warning">Theory Classes</h4>
          <p className="display-6 fw-bold">{summary.theory}</p>
        </div>
      </section>

      {/* Main Calendar */}
      <main className="workload-main p-4">
        <h3 className="mb-3"> Weekly Calendar View</h3>
        <CalendarApp />
      </main>

      {/* Navigate to Table Page */}
      <div className="text-center my-4">
        <button onClick={handleNavigate} className="btn btn-lg btn-primary px-5">
          ➕ Add New Time-Table Entry
        </button>
      </div>

      {/* Footer */}
      <footer className="workload-footer text-center py-3 bg-dark text-white">
        <p>© 2025 Aldronyx Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}
