import React from "react";
import "../styles/dateOptions.css";

export default function DateOptionsModal({ date, onClose, onShowList, onShowAdd }) {
  return (
    <div className="options-overlay">
      <div className="options-box">
        <h3>{date}</h3>

        <button className="option-btn" onClick={onShowList}>
          View Added Expenses
        </button>

        <button className="option-btn add" onClick={onShowAdd}>
          Add New Expense
        </button>

        <button className="close-options" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
