import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
const CartTable = lazy(() => import("../common/cart/CartTable"));
const CartTotal = lazy(() => import("../common/cart/CartTotal"));
const ClearCartModal = lazy(() => import("../common/cart/ClearCartModal"));
const DeleteItemModal = lazy(() => import("../common/cart/DeleteItemModal"));
import Spinner from "../common/Spinner";

const columnHelper = createColumnHelper<{
  id: number;
  name: string;
  picture: string;
  price: string;
  quantity: number;
}>();

const Cart: React.FC = () => {
  const { state, dispatch, totalPrice } = useCart();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleDeleteClick = useCallback((id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch({ type: "REMOVE_ITEM", payload: itemToDelete });
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, [itemToDelete, dispatch]);

  const handleClearClick = useCallback(() => setShowClearModal(true), []);

  const confirmClear = useCallback(async () => {
    setIsClearing(true);

    // Show loading for 2 seconds minimum
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch({ type: "CLEAR_CART" });
    setIsClearing(false);
    setShowClearModal(false);
  }, [dispatch]);

  const handleDecreaseQuantity = useCallback(
    (id: number) => {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          id,
          quantity: Math.max(
            1,
            (state.items.find((item) => item.id === id)?.quantity ?? 1) - 1
          ),
        },
      });
    },
    [dispatch, state.items]
  );

  const handleIncreaseQuantity = useCallback(
    (id: number) => {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          id,
          quantity: Math.min(
            10,
            (state.items.find((item) => item.id === id)?.quantity ?? 0) + 1
          ),
        },
      });
    },
    [dispatch, state.items]
  );

  const columns = useMemo(
    () => [
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
            loading="lazy"
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
        id: "quantity",
        cell: () => null, // Handled in TableRow component
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => null, // Handled in TableRow component
      }),
    ],
    []
  );

  const tableData = useMemo(
    () =>
      state.items.length === 0
        ? [{ id: 0, name: "—", picture: "—", price: "—", quantity: 0 }]
        : state.items,
    [state.items]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Suspense fallback={<Spinner />}>
      <div className="container mt-5 mb-5 pt-5 d-flex flex-column justify-content-center">
        <h2 className="mb-4 text-left">
          <FaShoppingCart /> Kosár
        </h2>

        <CartTable
          table={table}
          isEmpty={state.items.length === 0}
          columns={columns}
          onDecrease={handleDecreaseQuantity}
          onIncrease={handleIncreaseQuantity}
          onDelete={handleDeleteClick}
        />

        <CartTotal
          totalPrice={totalPrice}
          isEmpty={state.items.length === 0}
          onClearCart={handleClearClick}
        />

        <DeleteItemModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        <ClearCartModal
          show={showClearModal}
          onHide={() => setShowClearModal(false)}
          onConfirm={confirmClear}
          isLoading={isClearing}
        />
      </div>
    </Suspense>
  );
};

export default Cart;
