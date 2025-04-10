import React from "react";

interface CartTotalProps {
  totalPrice: number;
  isEmpty: boolean;
  onClearCart: () => void;
}

const CartTotal: React.FC<CartTotalProps> = ({
  totalPrice,
  isEmpty,
  onClearCart,
}) => (
  <>
    <div className="text-end mt-3">
      <h4>
        Összesen:{" "}
        <span className="text-danger text-xxl">{totalPrice.toFixed(2)} Ft</span>
      </h4>
    </div>
    {isEmpty ? (
      <p className="text-center text-light fs-5">A kosarad még üres.</p>
    ) : (
      <div className="text-end mt-3">
        <button className="btn btn-outline-danger" onClick={onClearCart}>
          Kosár Törlése
        </button>
      </div>
    )}
  </>
);
export default CartTotal;
