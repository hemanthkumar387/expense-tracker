import React, { useState } from "react";
import "../styles/modal.css";

export default function ExpenseModal({ date, onClose, onAdd, onBack }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!amount) return alert("Amount is required!");

    onAdd({
      id: Date.now(),
      date,
      amount,
      category,
      note,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="back-btn" onClick={onBack}>← Back</button>

        <h3>Add Expense – {date}</h3>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Clothes</option>
          <option>Entertainment</option>
          <option>Grocery</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Notes (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="add-btn" onClick={handleSubmit}>
          Add Expense
        </button>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
