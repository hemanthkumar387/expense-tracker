// Format date to YYYY-MM-DD (LOCAL DATE — no UTC shift)
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Check if date is within last N years
export const isWithinYears = (dateStr, years) => {
  const date = new Date(dateStr);
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - years);
  return date >= cutoff;
};
