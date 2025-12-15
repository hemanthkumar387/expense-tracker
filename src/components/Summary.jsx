import React from "react";
import "../styles/summary.css";

export default function Summary({ expenses, selectedDate }) {
  if (!selectedDate) return null;

  const dayTotal = expenses
    .filter((e) => e.date === selectedDate)
    .reduce((a, b) => a + Number(b.amount), 0);

  const monthStr = selectedDate.slice(0, 7);
  const monthTotal = expenses
    .filter((e) => e.date.startsWith(monthStr))
    .reduce((a, b) => a + Number(b.amount), 0);

  const yearStr = selectedDate.slice(0, 4);
  const yearTotal = expenses
    .filter((e) => e.date.startsWith(yearStr))
    .reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div className="summary-container">
      <div className="summary-item">Day: ₹{dayTotal}</div>
      <div className="summary-item">Month: ₹{monthTotal}</div>
      <div className="summary-item">Year: ₹{yearTotal}</div>
    </div>
  );
}
