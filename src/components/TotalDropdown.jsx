import React, { useState } from "react";
import "../styles/filters.css";

export default function TotalDropdown({ expenses }) {
  const [selected, setSelected] = useState("month");

  const now = new Date();
  const monthStr = now.toISOString().slice(0, 7);
  const yearStr = now.getFullYear();

  const getTotal = () => {
    if (selected === "month") {
      return expenses
        .filter((e) => e.date.startsWith(monthStr))
        .reduce((a, b) => a + Number(b.amount), 0);
    }

    if (selected === "year") {
      return expenses
        .filter((e) => e.date.startsWith(String(yearStr)))
        .reduce((a, b) => a + Number(b.amount), 0);
    }

    if (selected === "2years") {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 2);
      return expenses
        .filter((e) => new Date(e.date) >= cutoff)
        .reduce((a, b) => a + Number(b.amount), 0);
    }

    if (selected === "5years") {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 5);
      return expenses
        .filter((e) => new Date(e.date) >= cutoff)
        .reduce((a, b) => a + Number(b.amount), 0);
    }

    return 0;
  };

  return (
    <div className="dropdown-summary-container">
      <select
        className="summary-dropdown"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="month">This Month</option>
        <option value="year">This Year</option>
        <option value="2years">Last 2 Years</option>
        <option value="5years">Last 5 Years</option>
      </select>

      <div className="dropdown-total-box">
        Total: ₹{getTotal()}
      </div>
    </div>
  );
}
