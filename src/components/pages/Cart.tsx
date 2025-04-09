import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useCart } from "../../context/CartContext";
import { FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const columnHelper = createColumnHelper<{
  id: number;
  name: string;
  picture: string;
  price: string;
  quantity: number;
}>();

const Cart: React.FC = () => {
  const { state, dispatch, totalPrice } = useCart();

  const columns = [
    columnHelper.accessor("picture", {
      header: "Termék",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Product"
          width={60}
          height={60}
          className="rounded"
          style={{ objectFit: "cover" }}
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Név",
      cell: (info) => <span className="fw-bold">{info.getValue()}</span>,
    }),
    columnHelper.accessor("price", {
      header: "Ár",
      cell: (info) => {
        const item = info.row.original;
        const price = parseFloat(
          item.price.replace(" Ft", "").replace(",", ".")
        );
        const totalPriceForItem = price * item.quantity;
        return (
          <span className="text-info">{totalPriceForItem.toFixed(2)} Ft</span>
        );
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Mennyiség",
      cell: (info) => {
        const item = info.row.original;
        return (
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-sm btn-danger"
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: {
                    id: item.id,
                    quantity: Math.max(item.quantity - 1, 1),
                  }, // Min quantity: 1
                })
              }
              disabled={item.quantity <= 1} // Disable "-" button if quantity is 1
            >
              -
            </button>
            <span className="mx-2">{info.getValue()}</span>
            <button
              className="btn btn-sm btn-success"
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: {
                    id: item.id,
                    quantity: Math.min(item.quantity + 1, 10),
                  }, // Max quantity: 10
                })
              }
              disabled={item.quantity >= 10} // Disable "+" button if quantity is 10
            >
              +
            </button>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() =>
            dispatch({ type: "REMOVE_ITEM", payload: row.original.id })
          }
        >
          Törlés <FaTrash />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data:
      state.items.length === 0
        ? [
            {
              id: 0,
              name: "—",
              picture: "—",
              price: "—",
              quantity: 0,
            },
          ]
        : state.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-5 mb-5 pt-5 d-flex flex-column justify-content-center">
      <h2 className="mb-4 text-left">
        <FaShoppingCart /> Kosár
      </h2>
      <div className="table-responsive">
        <table className="table table-bordered table-dark table-hover overflow-hidden align-middle">
          <thead className="table-dark text-light">
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
            {state.items.length === 0 ? (
              <tr>
                {columns.map((_, idx) => (
                  <td key={idx} className="text-center text-light">
                    <FaMinus />
                  </td>
                ))}
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-center p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-end mt-3">
        <h4>
          Összesen:{" "}
          <span className="text-danger text-xxl">
            {totalPrice.toFixed(2)} Ft
          </span>
        </h4>
      </div>
      {state.items.length === 0 ? (
        <p className="text-center text-light fs-5">A kosarad még üres.</p>
      ) : (
        <div className="text-end mt-3">
          <button
            className="btn btn-outline-danger"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Minden Törlése
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
