import { createLazyFileRoute } from "@tanstack/react-router";
import CategoryItems from "../../../components/pages/CategorItems";

export const Route = createLazyFileRoute("/about/category/$category")({
  component: CategoryItems,
});
