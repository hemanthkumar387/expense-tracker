import React from "react";
import "../styles/filters.css";

export default function Filters({ setFilterYears }) {
  return (
    <div className="filter-container">
      <button onClick={() => setFilterYears(1)}>Last 1 Year</button>
      <button onClick={() => setFilterYears(2)}>Last 2 Years</button>
      <button onClick={() => setFilterYears(3)}>Last 3 Years</button>
      <button onClick={() => setFilterYears(5)}>Last 5 Years</button>
      <button onClick={() => setFilterYears("all")}>All Time</button>
    </div>
  );
}
