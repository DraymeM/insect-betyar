import { createFileRoute } from "@tanstack/react-router";
import Cart from "./../components/pages/Cart";

export const Route = createFileRoute("/cart")({
  component: Cart,
});
