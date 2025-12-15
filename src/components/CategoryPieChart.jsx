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

  // Convert to Recharts data
  const data = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));

  // Colors for slices
  const COLORS = [
    "#1E90FF",
    "#FF6347",
    "#2ECC71",
    "#A569BD",
    "#F4D03F",
    "#16A085",
    "#F39C12",
  ];

  return (
    <div className="piechart-container">
      <h3>Expense By Category</h3>

      {/* Responsive container makes the chart scale automatically */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={"80%"}
            innerRadius={0}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
