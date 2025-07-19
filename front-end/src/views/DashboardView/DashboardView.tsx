import Container from "../../components/Container";

const DashboardView = () => {
  return (
    <div className="flex flex-col gap-15">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <div className="flex flex-col gap-15">
        <div className="flex flex-row justify-between gap-10">
          <Container className="w-[30%]">
            <p className="text-lg font-[300]">Total Products</p>
            <p className="text-xl font-[500]">24</p>
          </Container>
          <Container className="w-[30%]">
            <p className="text-lg font-[300]">Available Stock</p>
            <p className="text-xl font-[500]">18</p>
          </Container>
          <Container className="w-[30%]">
            <p className="text-lg font-[300]">Out of Stock</p>
            <p className="text-xl font-[500]">6</p>
          </Container>
        </div>
        <div className="flex flex-row gap-10">
            <Container className="w-[50%]">
                <h1 className="text-xl font-[500]">Top Products By Category</h1>
            </Container>
            <Container className="w-[50%]">
                <h1 className="text-xl font-[500]">Transaction Log</h1>
            </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
