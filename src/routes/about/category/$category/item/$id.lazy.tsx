import { createLazyFileRoute } from "@tanstack/react-router";
import ItemDetail from "../../../../../components/pages/ItemDetails";

export const Route = createLazyFileRoute("/about/category/$category/item/$id")({
  component: ItemDetail,
});
