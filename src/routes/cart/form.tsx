import { createFileRoute } from "@tanstack/react-router";
import OrderForm from "../../components/common/order/OrderInfoForm";

export const Route = createFileRoute("/cart/form")({
  component: OrderForm,
});
