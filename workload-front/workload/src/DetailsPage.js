import React, { useState } from "react";

export default function SubjectEntryPage() {
  const [subjects, setSubjects] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState("Theory");

  const handleAddSubject = () => {
    if (!subjectCode || !subjectName) return alert("Please fill all fields.");
    
    setSubjects((prev) => [
      ...prev,
      { code: subjectCode.trim(), name: subjectName.trim(), type: subjectType },
    ]);

    // Clear input
    setSubjectCode("");
    setSubjectName("");
    setSubjectType("Theory");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subject Entry Form</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={subjectType}
          onChange={(e) => setSubjectType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Theory">Theory</option>
          <option value="Lab">Lab</option>
        </select>
      </div>

      <button
        onClick={handleAddSubject}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Subject
      </button>

      {/* Subject Table */}
      {subjects.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Subject List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Code</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border p-2">{subj.code}</td>
                  <td className="border p-2">{subj.name}</td>
                  <td className="border p-2">{subj.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
