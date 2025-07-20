// views/DashboardView.tsx or wherever you're using it
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../components/DataTable";

type ProductRow = {
  product: string;
  status: string;
  date: string;
};

const data: ProductRow[] = [
  { product: "Widget A", status: "In Stock", date: "2025-07-18" },
  { product: "Widget B", status: "Out of Stock", date: "2025-07-17" },
  { product: "Widget C", status: "In Production", date: "2025-07-16" },
];

const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => info.getValue(),
  },
];

const TransactionTable = () => {
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
