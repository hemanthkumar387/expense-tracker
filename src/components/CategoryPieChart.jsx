import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/piechart.css";

export default function CategoryPieChart({ expenses }) {
  if (!expenses || expenses.length === 0) return null;

  // Group by category
  const categoryMap = {};

  expenses.forEach((e) => {
    const cat = e.category;
    const amt = Number(e.amount);
    if (!categoryMap[cat]) categoryMap[cat] = 0;
    categoryMap[cat] += amt;
  });

  const data = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));

  const COLORS = [
    "#1E90FF",
    "#FF6347",
    "#2ECC71",
    "#A569BD",
    "#F4D03F",
    "#16A085",
    "#F39C12",
  ];

  // ⭐ Custom label renderer with automatic font-size adjustment
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Responsive font size: adjust based on outerRadius
    let fontSize = outerRadius * 0.12; // auto-scaling
    if (fontSize < 10) fontSize = 10;  // minimum readable
    if (fontSize > 18) fontSize = 18;  // max to avoid crowding

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize, fontWeight: "bold" }}
      >
        ₹{value}
      </text>
    );
  };

  return (
    <div className="piechart-container">
      <h3>Expense By Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            label={renderCustomLabel}  // <-- custom label
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
