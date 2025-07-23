// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkloadPage from "./WorkloadPage";
import DetailsPage from "./DetailsPage";
import Subject from "./subject/Subject";
import Table from "./table/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkloadPage/>} />
        
        <Route path="/subjects" element={<Subject />} />
        <Route path="/table" element={<Table />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
