"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultType, setResultType] = useState("");
  const [topic, setTopic] = useState("");

  const handleAction = async (type: string) => {
    if (!text) {
      alert("Please enter study notes");
      return;
    }

    setLoading(true);
    setResult("");
    setResultType(type);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, difficulty, type }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  const exportToPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("StudyWith AI", pageWidth / 2, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Generated ${resultType.toUpperCase()} Document`,
      pageWidth / 2,
      28,
      { align: "center" },
    );

    doc.line(20, 32, pageWidth - 20, 32);

    doc.text(`Topic: ${topic || "Not Specified"}`, 20, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);

    const lines = doc.splitTextToSize(result, 170);
    doc.text(lines, 20, 65);

    doc.save(`StudyWithAI-${topic || "Output"}-${resultType}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-14 sm:py-16 px-4 sm:px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Notes Summarizer
          </h1>
        </div>

        {/* Topic Input */}
        <input
          type="text"
          placeholder="Enter Topic (optional)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-slate-900 border border-blue-500 rounded-xl p-3 sm:p-4 mb-6 text-sm sm:text-base"
        />

        {/* Textarea Glow Container */}
        <div className="relative w-full mb-8">
          <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-blue-500 p-4 sm:p-6 shadow-lg">
            <textarea
              rows={8}
              placeholder="Paste your study notes..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-200 placeholder-slate-500 resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 items-stretch sm:items-center justify-center">
          <select
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {["summary", "keypoints", "simplify"].map((type) => (
            <button
              key={type}
              onClick={() => handleAction(type)}
              className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.03] shadow-md text-sm sm:text-base"
            >
              {type === "summary" && "Summarize"}
              {type === "keypoints" && "Key Points"}
              {type === "simplify" && "Simplify"}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-blue-400 text-sm sm:text-base"
          >
            Generating AI response...
          </motion.div>
        )}

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-lg mt-8"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-400 capitalize">
              {resultType === "summary" && "Summary"}
              {resultType === "keypoints" && "Key Points"}
              {resultType === "simplify" && "Simplified Version"}
            </h2>

            <p className="whitespace-pre-line text-slate-300 leading-relaxed text-sm sm:text-base">
              {result}
            </p>

            <button
              onClick={exportToPDF}
              className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Export as PDF
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
