import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

type DashboardPieChartType = {
    data: { name: string; value: number; }[];
}

const DashboardPieChart = ({data}: DashboardPieChartType) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name }) => name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;