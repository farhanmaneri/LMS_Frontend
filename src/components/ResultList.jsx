import React from "react";

export default function ResultList({ results }) {
  // Ensure results is always an array
  const safeResults = Array.isArray(results) ? results : [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">📊 Your Results</h2>

      {safeResults.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <ul className="space-y-2">
          {safeResults.map((r) => (
            <li
              key={r._id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{r.subject?.name || "—"}</p>
                <p className="text-sm text-gray-500">
                  {r.exam?.name || "Exam"} – {r.marksObtained}/{r.totalMarks}
                </p>
              </div>
              <span className="text-sm font-bold text-blue-600">
                {r.grade || "-"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
