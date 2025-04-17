import React from "react";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../../../context/CartContext";

interface OrderSummaryProps {
  onConfirm: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onConfirm }) => {
  const { state, totalPrice } = useCart();

  return (
    <div className="container bg-dark text-light mt-5">
      <h3>Your Order Summary</h3>
      <Card className="bg-dark text-light">
        <Card.Body>
          <h4>Items</h4>
          {state.items.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - {item.quantity} x {item.price} Ft
              </p>
            </div>
          ))}
          <hr />
          <h4>Total: {totalPrice} Ft</h4>
          <Button variant="success" onClick={onConfirm}>
            Confirm Order
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderSummary;
