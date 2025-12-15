import React from "react";
import "../styles/dateOptions.css";

export default function DateOptionsModal({ date, expenses, onClose, onShowList, onShowAdd }) {

  // Calculate total for that day
  const dayExpenses = expenses.filter(e => e.date === date);
  const totalSpent = dayExpenses.reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div className="options-overlay">
      <div className="options-box">

        <h3>{date}</h3>

        {/* Show total only if expenses exist */}
        {dayExpenses.length > 0 && (
          <div className="day-total-in-options">
            Total Spent: ₹{totalSpent}
          </div>
        )}

        <button className="option-btn" onClick={onShowList}>
          View Added Expenses
        </button>

        <button className="option-btn add" onClick={onShowAdd}>
          Add New Expense
        </button>

        <button className="close-options" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
