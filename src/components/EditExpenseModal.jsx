import React, { useState } from "react";
import "../styles/modal.css";

export default function EditExpenseModal({ expense, onClose, onSave }) {
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [note, setNote] = useState(expense.note);

  const handleSave = () => {
    onSave({
      ...expense,
      amount,
      category,
      note,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="back-btn" onClick={onClose}>← Back</button>

        <h3>Edit Expense – {expense.date}</h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Clothes</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="add-btn" onClick={handleSave}>
          Save Changes
        </button>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
