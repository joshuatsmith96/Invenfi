import Container from "../../components/Container";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import TransactionTable from "../../components/Blocks/TransactionTable";

const DashboardView = () => {
  const dummy_data = [
    { name: "Clothing", value: 400 },
    { name: "Furniture", value: 300 },
    { name: "Food", value: 300 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="flex flex-col gap-15">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-15">
        <div className="flex flex-row justify-between gap-10">
          <Container className="w-[30%]">
            <p className="text-md font-[300]">Total Products</p>
            <p className="text-lg font-[500]">24</p>
          </Container>
          <Container className="w-[30%]">
            <p className="text-md font-[300]">Available Stock</p>
            <p className="text-lg font-[500]">18</p>
          </Container>
          <Container className="w-[30%]">
            <p className="text-md font-[300]">Out of Stock</p>
            <p className="text-lg font-[500]">6</p>
          </Container>
        </div>
        <div className="flex flex-row gap-10">
          <Container className="w-[50%]">
            <h1 className="text-lg font-[500] mb-5">Top Products By Category</h1>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dummy_data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {dummy_data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Container>
          <Container className="w-[50%]">
            <h1 className="text-lg font-[500]">Transaction Log</h1>
            <TransactionTable />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
