import React, { useRef, useEffect } from "react";
import "./Dialog.css";

export default function Dialog({
  show,
  onClose,
  title,
  children,
  daySubjects = [],
}) {
  const boxRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        onClose(); // close if clicked outside the box
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box" ref={boxRef}>
        {title && <h2 className="dialog-title">{title}</h2>}

        <div className="dialog-content">
          {daySubjects.length > 0 ? (
            <table className="table table-bordered table-sm text-start">
              <thead className="table-dark">
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {daySubjects.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.time}</td>
                    <td>{entry.subject}</td>
                    <td>{entry.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No entries for this day.</p>
          )}

          {children}
        </div>

        {/* <div className="dialog-actions mt-2">
          <button onClick={onClose} className="dialog-close-button btn btn-secondary">
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}
