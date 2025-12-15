import "../styles/summary.css";

export default function AdvancedSummary({ expenses }) {
    const today = new Date();

    // Format today (local date)
    const todayStr = today.toISOString().split("T")[0];

    // Yesterday (local)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // --- WEEK CALCULATION (Sunday → Saturday) ---

    // Get start of week = previous Sunday
    const getStartOfWeek = (d) => {
        const date = new Date(d);
        const day = date.getDay(); // 0 = Sunday
        date.setDate(date.getDate() - day);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    // Get end of week = next Saturday
    const getEndOfWeek = (d) => {
        const date = new Date(d);
        const day = date.getDay();
        date.setDate(date.getDate() + (6 - day));
        date.setHours(23, 59, 59, 999);
        return date;
    };

    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = getEndOfWeek(today);


    // --- FIX: Convert YYYY-MM-DD to LOCAL date, not UTC ---
    const parseLocalDate = (str) => {
        return new Date(str + "T00:00:00"); 
    };

    const todayTotal = expenses
        .filter((e) => e.date === todayStr)
        .reduce((a, b) => a + Number(b.amount), 0);

    const yesterdayTotal = expenses
        .filter((e) => e.date === yesterdayStr)
        .reduce((a, b) => a + Number(b.amount), 0);

    // WEEKLY TOTAL (Sunday → Saturday)
    const weekTotal = expenses
        .filter((e) => {
            const expDate = parseLocalDate(e.date); // FIXED
            return expDate >= startOfWeek && expDate <= endOfWeek;
        })
        .reduce((a, b) => a + Number(b.amount), 0);

    return (
        <div className="advanced-summary-box">
            <div>Today: ₹{todayTotal}</div>
            <div>Yesterday: ₹{yesterdayTotal}</div>
            <div>This Week: ₹{weekTotal}</div>
        </div>
    );
}
