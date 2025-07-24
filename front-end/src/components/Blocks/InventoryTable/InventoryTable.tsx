import React, { useMemo, useState, useEffect } from "react";
import { callAPI } from "../../../utils/callAPI";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import type { RowSelectionState } from "@tanstack/react-table";
import ConfirmDeleteOverlay from "../../ConfirmDeleteOverlay";

type InventoryItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  brand: string;
  description: string;
  current_stock: number;
  minimum_stock: number;
  cost_price: number;
  sell_price: number;
  status: string;
  location: string;
  barcode: string;
  weight: number;
  image_url: string;
};

const columnHelper = createColumnHelper<InventoryItem>();

const InventoryTable = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  useEffect(() => {
    const retrieveInventoryData = async () => {
      try {
        const result = await callAPI.getInventory();
        const inventory: InventoryItem[] =
          result?.items?.map((inv: unknown): InventoryItem => {
            const item = inv as Partial<InventoryItem>;
            return {
              id: item.id ?? 0,
              name: item.name ?? "",
              sku: item.sku ?? "",
              category: item.category ?? "",
              brand: item.brand ?? "",
              description: item.description ?? "",
              current_stock: item.current_stock ?? 0,
              minimum_stock: item.minimum_stock ?? 0,
              cost_price: item.cost_price ?? 0,
              sell_price: item.sell_price ?? 0,
              status: item.status ?? "",
              location: item.location ?? "",
              barcode: item.barcode ?? "",
              weight: item.weight ?? 0,
              image_url: item.image_url ?? "",
            };
          }) || [];
        setData(inventory);
      } catch {
        console.log("ERROR fetching inventory");
      }
    };
    retrieveInventoryData();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "select",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        header: ({ table }: { table: any }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Toggle All Rows Selected"
          />
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: ({ row }: { row: any }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select row ${row.id}`}
          />
        ),
      },
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
      columnHelper.accessor("current_stock", {
        header: "Stock",
        cell: (info) => info.getValue().toLocaleString(),
      }),
    ],
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterFn = (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true;
    const value = row.getValue(columnId);
    if (fieldFilter) {
      // Only filter on the selected field/column
      if (columnId !== fieldFilter) return true; // skip other columns
    }
    return String(value).toLowerCase().includes(filterValue.toLowerCase());
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    globalFilterFn: filterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldFilter(e.target.value);
  };

  const onDeleteClick = () => {
    if (Object.keys(rowSelection).length === 0) {
      alert("No items selected to delete.");
      return;
    }
    setConfirmDeleteVisible(true);
  };

  const onConfirmDelete = async () => {
    const idsToDelete = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((rowId) => {
        const row = table.getRow(rowId);
        return row.original.id;
      });

    try {
      for (const id of idsToDelete) {
        await callAPI.deleteInventoryItem(id);
      }

      setData((prevData) => prevData.filter((item) => !idsToDelete.includes(item.id)));

      setRowSelection({});
      setConfirmDeleteVisible(false);

      alert("Selected items deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting some items.");
      setConfirmDeleteVisible(false);
    }
  };

  const onCancelDelete = () => {
    setConfirmDeleteVisible(false);
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
            <button
              onClick={onDeleteClick}
              className="bg-red-600 text-white px-3 p-2 rounded hover:bg-red-700 text-sm"
              disabled={Object.keys(rowSelection).length === 0}
              aria-disabled={Object.keys(rowSelection).length === 0}
            >
              Delete
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
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 text-left text-sm text-gray-700">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 1 ? "bg-blue-50" : "bg-white"}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2 text-sm text-gray-800">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDeleteOverlay
        visible={confirmDeleteVisible}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </div>
  );
};

export default InventoryTable;
