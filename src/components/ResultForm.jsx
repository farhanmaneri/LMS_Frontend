// src/components/ResultForm.jsx
import { useState } from "react";
import { useAddResultMutation } from "../redux/api/apiSlice";

export default function ResultForm() {
  const [formData, setFormData] = useState({
    student: "",
    classId: "",
    subject: "",
    exam: "",
    marksObtained: "",
    totalMarks: "",
    remarks: "",
  });

  const [addResult, { isLoading }] = useAddResultMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addResult(formData).unwrap();
      alert("Result added successfully ✅");
      setFormData({
        student: "",
        classId: "",
        subject: "",
        exam: "",
        marksObtained: "",
        totalMarks: "",
        remarks: "",
      });
    } catch (err) {
      alert("Failed to add result ❌");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded space-y-3"
    >
      <input
        name="student"
        placeholder="Student ID"
        value={formData.student}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="classId"
        placeholder="Class ID"
        value={formData.classId}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="subject"
        placeholder="Subject ID"
        value={formData.subject}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="exam"
        placeholder="Exam ID"
        value={formData.exam}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="marksObtained"
        placeholder="Marks Obtained"
        type="number"
        value={formData.marksObtained}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="totalMarks"
        placeholder="Total Marks"
        type="number"
        value={formData.totalMarks}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="remarks"
        placeholder="Remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Saving..." : "Add Result"}
      </button>
    </form>
  );
}
