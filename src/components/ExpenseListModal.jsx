import "../styles/dateOptions.css";

export default function ExpenseListModal({
  date,
  expenses,
  onClose,
  onBack,
  onEdit,
  onDelete,
}) {
  const dayExpenses = expenses.filter((e) => e.date === date);
  const totalSpent = dayExpenses.reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div className="options-overlay">
      <div className="options-box">

        {/* Back Button */}
        <button className="back-btn" onClick={onBack}>← Back</button>

        <h3>Expenses – {date}</h3>

        {/* Show Total Spent */}
        {dayExpenses.length > 0 && (
          <div className="day-total-display">
            Total Spent: ₹{totalSpent}
          </div>
        )}

        {/* Expense List */}
        {dayExpenses.length === 0 ? (
          <p>No expenses added.</p>
        ) : (
          <ul className="expense-list">
            {dayExpenses.map((e) => (
              <li key={e.id} className="expense-item">
                <div className="expense-info">
                  <strong>₹{e.amount}</strong> – {e.category}
                  {e.note && <span> ({e.note})</span>}
                </div>

                <div className="expense-actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(e)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(e.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Close Button */}
        <button className="close-options" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
