import React, { useState, useEffect } from "react";
import CalendarView from "../components/CalenderView.jsx";
import AdvancedSummary from "../components/AdvancedSummary";
import TotalDropdown from "../components/TotalDropdown";
import { isWithinYears } from "../utils/dateUtils.js";
import CategoryPieChart from "../components/CategoryPieChart";

export default function Home() {
    const [expenses, setExpenses] = useState([]);
    const [filterYears, setFilterYears] = useState("all");
    const [selectedDate, setSelectedDate] = useState(null);

    // Load from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("expenses")) || [];
        setExpenses(saved);
    }, []);

    // Save whenever expenses update
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    // Add new expense
    const handleAddExpense = (expense) => {
        setExpenses((prev) => [...prev, expense]);
    };

    const handleUpdateExpense = (updatedExpense) => {
        const newList = expenses.map((e) =>
            e.id === updatedExpense.id ? updatedExpense : e
        );
        setExpenses(newList);
    };

    const handleDeleteExpense = (id) => {
        const newList = expenses.filter((e) => e.id !== id);
        setExpenses(newList);
    };


    // Filter expenses by years
    const filteredExpenses =
        filterYears === "all"
            ? expenses
            : expenses.filter((e) => isWithinYears(e.date, filterYears));

    return (
        <div className="home-wrapper">
            <AdvancedSummary expenses={filteredExpenses} />

            <TotalDropdown expenses={filteredExpenses} />

            <CalendarView
                expenses={filteredExpenses}
                onAdd={handleAddExpense}
                onUpdate={handleUpdateExpense}
                onDelete={handleDeleteExpense}
                setSelectedDate={setSelectedDate}
            />

            <CategoryPieChart expenses={filteredExpenses} />
        </div>
    );
}
