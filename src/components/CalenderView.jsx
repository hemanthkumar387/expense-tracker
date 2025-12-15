import React, { useState } from "react";
import Calendar from "react-calendar";
import ExpenseModal from "./ExpenseModal";
import ExpenseListModal from "./ExpenseListModal";
import EditExpenseModal from "./EditExpenseModal";
import DateOptionsModal from "./DateOptionsModal";
import { formatDate } from "../utils/dateUtils";
import '../styles/calendar.css';
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ expenses, onAdd, onUpdate, onDelete }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const handleDateClick = (date) => {
    const formatted = formatDate(date);
    setSelectedDate(formatted);
    setShowOptions(true);
  };

  const tileContent = ({ date }) => {
  const dateStr = formatDate(date);

  const hasSpent = expenses.some((e) => e.date === dateStr);

  return hasSpent ? (
    <div className="spent-dot">✅</div>
  ) : null;
};


  return (
    <div className="calendar-container">
      <Calendar onClickDay={handleDateClick} tileContent={tileContent} />

      {/* Options Modal */}
      {showOptions && (
        <DateOptionsModal
          date={selectedDate}
          onClose={() => setShowOptions(false)}
          onShowList={() => {
            setShowOptions(false);
            setShowListModal(true);
          }}
          onShowAdd={() => {
            setShowOptions(false);
            setShowAddModal(true);
          }}
        />
      )}

      {/* List Modal */}
      {showListModal && (
        <ExpenseListModal
          date={selectedDate}
          expenses={expenses}
          onClose={() => setShowListModal(false)}
          onBack={() => {
            setShowListModal(false);
            setShowOptions(true);
          }}
          onEdit={(expense) => {
            setEditingExpense(expense);
            setShowListModal(false);
            setShowEditModal(true);
          }}
          onDelete={(id) => onDelete(id)}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <ExpenseModal
          date={selectedDate}
          onAdd={onAdd}
          onClose={() => setShowAddModal(false)}
          onBack={() => {
            setShowAddModal(false);
            setShowOptions(true);
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setShowEditModal(false)}
          onSave={(updated) => onUpdate(updated)}
        />
      )}
    </div>
  );
}
