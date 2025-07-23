import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Table.css";
import Subject from "../subject/Subject";

export default function Table() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "10:00 AM", "11:45 AM", "12:35 PM", "01:25 PM",
    "02:10 PM", "03:00 PM", "03:50 PM", "04:50 PM"
  ];

  const [tableData, setTableData] = useState(() =>
    Object.fromEntries(
      days.map((day) => [
        day,
        Object.fromEntries(
          timeSlots.map((time) => [time, { subject: "", type: "" }])
        )
      ])
    )
  );

  const [showModal, setShowModal] = useState(false);
  const [editDay, setEditDay] = useState("");
  const [editTime, setEditTime] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectType, setSubjectType] = useState("");
  // Fetch data from backend on load
  useEffect(() => {
    fetch("http://localhost:8080/table/getTable")
      .then(res => res.json())
      .then(data => {
        const updated = { ...tableData };
        data.forEach(({ day, time, subject, type }) => {
          if (updated[day] && updated[day][time]) {
            updated[day][time] = { subject, type };
          }
        });
        setTableData(updated);
      })
      .catch(err => console.error("Failed to load table data:", err));
  }, []);

  const openModal = (day, time) => {
    setEditDay(day);
    setEditTime(time);
    const { subject, type } = tableData[day][time];
    setSubjectInput(subject);
    setSubjectType(type);
    setShowModal(true);
  };

  const handleSave = ({ subject, type }) => {
    setTableData((prevData) => ({
      ...prevData,
      [editDay]: {
        ...prevData[editDay],
        [editTime]: { subject, type }
      }
    }));
  
    setShowModal(false);
  };

  const handleDeleteCell = (day, time) => {
    setTableData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [time]: { subject: "", type: "" }
      }
    }));
    deleteEntry(day, time);
  };

function deleteEntry(day, time) {
  fetch("http://localhost:8080/table/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ day, time })
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
    })
    .catch(err => console.error(err));
}


  return (
    <>
      <div className="table-card-front">
        <div className="table-center-wrap">
          <div className="section text-center">
            <h1 className="mb-4 pb-3" style={{ fontFamily: "Times, serif", color: "#fdfeffff" }}>
              TIME TABLE
            </h1>

            <div className="table-responsive">
              <table className="timetable-block table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Day / Time</th>
                    {timeSlots.map((time) => (
                      <th key={time}>{time}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td><strong>{day}</strong></td>
                      {timeSlots.map((time) => {
                        const { subject, type } = tableData[day][time];
                        const hasData = subject || type;

                        return (
                          <td key={time}>
                            {hasData ? (
                              <div className="d-flex justify-content-center align-items-center ms-2 gap-2 h-100">
                                <span>
                                  {subject}
                                  {type && (
                                    <small className="text-muted"> ({type})</small>
                                  )}
                                </span>
                                <div>
                                  <button
                                    className="table-btn btn-sm p-1  "
                                    onClick={() => handleDeleteCell(day, time)}
                                  >
                                    <i className="bi bi-trash" style={{ fontSize: "12px" }}></i>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="table-btn "
                                onClick={() => openModal(day, time)}
                              >
                                <span className="bi bi-pencil-square"></span>
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Subject
        show={showModal}
        day={editDay}
        time={editTime}
        value={{ subject: subjectInput, type: subjectType }}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </>
  );
}

