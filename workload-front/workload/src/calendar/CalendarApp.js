import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, add, sub } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "../dialog/Dialog";
import "./CalendarApp.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarApp() {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [daySubjects, setDaySubjects] = useState([]);
  const [activeNav, setActiveNav] = useState("today");
  const [eventDots, setEventDots] = useState([]);

  const goToToday = () => {
    setDate(new Date());
    setActiveNav("today");
  };

  const goToNext = () => {
    setDate((prev) => add(prev, view === "month" ? { months: 1 } : { weeks: 1 }));
    setActiveNav("next");
  };

  const goToBack = () => {
    setDate((prev) => sub(prev, view === "month" ? { months: 1 } : { weeks: 1 }));
    setActiveNav("back");
  };

  const handleDayClick = (clickedDate) => {
    const dayName = clickedDate.toLocaleDateString("en-US", { weekday: "long" });
    setSelectedDay(dayName);

    fetch(`http://localhost:8080/table/getTimetableByDay/${dayName}`)
      .then((res) => res.json())
      .then((data) => {
        setDaySubjects(data);
        setShowDialog(true);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };
  const EventDot = ({ event }) => {
  const color = event.type === "Lab" ? "red" : "blue";
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        backgroundColor: "transparent",
        margin: "0 auto",
      }}
    />
  );
};

  const handleSlotSelect = (slotInfo) => {
    if (view === Views.WEEK) return;
    const clickedDate = slotInfo.start;
    setDate(clickedDate);
    handleDayClick(clickedDate);
  };

  
//   useEffect(() => {
//   const fetchAllDays = async () => {
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//     let allEvents = [];

//     for (let day of days) {
//       try {
//         const res = await fetch(`http://localhost:8080/table/getTimetableByDay/${day}`);
//         const data = await res.json();

//         let current = new Date(firstDayOfMonth);
//         while (current <= lastDayOfMonth) {
//           const currentDayName = current.toLocaleDateString("en-US", { weekday: "long" });

//           if (currentDayName === day) {
//             data.forEach((entry) => {
//               allEvents.push({
//                 title: entry.type === "Lab" ? "🔴" : "🔵",
//                 type: entry.type,
//                 start: new Date(current),
//                 end: new Date(current),
//                 allDay: true,
//               });
//             });
//           }

//           current.setDate(current.getDate() + 1);
//         }
//       } catch (err) {
//         console.error(`Failed to fetch for ${day}:`, err);
//       }
//     }

//     setEventDots(allEvents);
//   };

//   fetchAllDays();
// }, [date])
useEffect(() => {
  const fetchAllDays = async () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let allEvents = [];

    for (let day of days) {
      try {
        const res = await fetch(`http://localhost:8080/table/getTimetableByDay/${day}`);
        const data = await res.json();

        let current = new Date(firstDayOfMonth);
        while (current <= lastDayOfMonth) {
          const currentDayName = current.toLocaleDateString("en-US", { weekday: "long" });

          if (currentDayName === day) {
            const typesForThisDay = new Set(data.map((entry) => entry.type));

            typesForThisDay.forEach((type) => {
              allEvents.push({
                title: type === "Lab" ? "🔴" : "🔵",
                type: type,
                start: new Date(current),
                end: new Date(current),
                allDay: true,
              });
            });
          }

          current.setDate(current.getDate() + 1);
        }
      } catch (err) {
        console.error(`Failed to fetch for ${day}:`, err);
      }
    }

    setEventDots(allEvents);
  };

  fetchAllDays();
}, [date]);


  return (
    <div
      className="p-4 min-h-screen bg-gray-100"
      style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#292424ff" }}
    >
      <div className="bg-white rounded-xl shadow p-4">
        <ul
          className="nav nav-pills nav-fill gap-2 p-1 small bg-dark rounded-5 shadow-sm mb-3"
          id="pillNav"
          role="tablist"
          style={{
            '--bs-nav-link-color': 'rgba(255, 255, 255, 0.75)',
            '--bs-nav-pills-link-active-color': '#000',
            '--bs-nav-pills-link-active-bg': '#f8f9fa'
          }}
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link rounded-5 ${activeNav === "back" ? "active" : ""}`}
              onClick={goToBack}
              type="button"
              role="tab"
            >⬅ Back</button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link rounded-5 ${activeNav === "today" ? "active" : ""}`}
              onClick={goToToday}
              type="button"
              role="tab"
            >Today</button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link rounded-5 ${activeNav === "next" ? "active" : ""}`}
              onClick={goToNext}
              type="button"
              role="tab"
            >Next ➡</button>
          </li>
        </ul>

        <Calendar
  localizer={localizer}
  events={eventDots}
  view={view}
  onView={setView}
  date={date}
  startAccessor="start"
  endAccessor="end"
  selectable={true}
  onSelectSlot={handleSlotSelect}
  components={{ toolbar: () => null, event: EventDot }}
  style={{ height: 500 }}
  drilldownView={null}
/>
      </div>

      <Dialog
        show={showDialog}
        onClose={() => setShowDialog(false)}
        title={`${selectedDay}, ${format(date, "MMMM d, yyyy")} - Subjects`}
        daySubjects={daySubjects}
      />
    </div>
  );
}
