import Container from "../../components/Container";
import TransactionTable from "./TransactionTable";
import DashboardPieChart from "./DashboardPieChart";

const DashboardView = () => {
  const dummy_data = [
    { name: "Clothing", value: 400 },
    { name: "Furniture", value: 300 },
    { name: "Food", value: 300 }
  ];


  return (
    <div className="flex flex-col gap-15">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-15">
        <div className="flex flex-row justify-between gap-10 max-xl:flex-col max-xl:gap-5">
          <Container className="w-[30%] max-xl:w-full max-xl:text-center">
            <p className="text-md font-[300]">Total Products</p>
            <p className="text-lg font-[500]">24</p>
          </Container>
          <Container className="w-[30%] max-xl:w-full max-xl:text-center">
            <p className="text-md font-[300]">Available Stock</p>
            <p className="text-lg font-[500]">18</p>
          </Container>
          <Container className="w-[30%] max-xl:w-full max-xl:text-center">
            <p className="text-md font-[300]">Out of Stock</p>
            <p className="text-lg font-[500]">6</p>
          </Container>
        </div>
        <div className="flex flex-row gap-10 max-xl:flex-col max-xl:w-full">
          <Container className="w-[50%] max-xl:w-full">
            <h1 className="text-lg font-[500] mb-5">Top Products By Category</h1>
            <div>
              <DashboardPieChart data={dummy_data}/>
            </div>
          </Container>
          <Container className="w-[50%] max-xl:w-full">
            <h1 className="text-lg font-[500]">Transaction Log</h1>
            <TransactionTable />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
