import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

type InventoryItem = {
  id: number;
  name: string;
  location: string;
  stock: number;
};

const defaultData: InventoryItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `A new item testing ${i + 1}`,
  location: "Test Location",
  stock: [21000, 673, 120, 32, 112, 5, 44, 0, 0, 0][i],
}));

const columnHelper = createColumnHelper<InventoryItem>();

const InventoryTable = () => {
  const [data] = useState(defaultData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: "Location",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("stock", {
        header: "Stock",
        cell: (info) => info.getValue().toLocaleString(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow rounded p-6 w-full">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Manage Inventory</h2>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
              + Add New Item
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
              🗑 Delete
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search here"
            className="border px-3 py-2 rounded w-full sm:w-auto flex-1"
            value={globalFilter}
            onChange={handleSearch}
          />
          <select
            className="border px-3 py-2 rounded w-full sm:w-auto"
            value={fieldFilter}
            onChange={handleFieldChange}
          >
            <option value="">Select field</option>
            <option value="name">Name</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="p-2">
                    <input type="checkbox" />
                  </th>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 text-left text-sm text-gray-700">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={idx % 2 === 1 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 text-sm text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
