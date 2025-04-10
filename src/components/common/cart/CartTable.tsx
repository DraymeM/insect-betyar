import React, { memo } from "react";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { FaMinus } from "react-icons/fa";
import { CartItem } from "../../../context/CartContext";
import { FaTrash } from "react-icons/fa6";

interface CartTableProps {
  table: ReturnType<typeof useReactTable<CartItem>>;
  isEmpty: boolean;
  columns: any[];
  onDecrease: (id: number) => void;
  onIncrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableRow = memo(
  ({
    row,
    onDecrease,
    onIncrease,
    onDelete,
  }: {
    row: any;
    onDecrease: (id: number) => void;
    onIncrease: (id: number) => void;
    onDelete: (id: number) => void;
  }) => {
    const item = row.original;
    return (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell: any) => (
          <td key={cell.id} className="text-center p-2">
            {cell.column.id === "quantity" ? (
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDecrease(item.id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onIncrease(item.id)}
                  disabled={item.quantity >= 10}
                >
                  +
                </button>
              </div>
            ) : cell.column.id === "actions" ? (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(item.id)}
              >
                Törlés <FaTrash />
              </button>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        ))}
      </tr>
    );
  }
);

const CartTable: React.FC<CartTableProps> = memo(
  ({ table, isEmpty, columns, onDecrease, onIncrease, onDelete }) => {
    const rows = table.getRowModel().rows;

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-dark table-hover table-striped overflow-hidden align-middle">
          <thead className="table-primary text-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-center p-2">
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
            {isEmpty ? (
              <tr>
                {columns.map((_, idx) => (
                  <td key={idx} className="text-center text-light">
                    <FaMinus />
                  </td>
                ))}
              </tr>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  onDecrease={onDecrease}
                  onIncrease={onIncrease}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default CartTable;
