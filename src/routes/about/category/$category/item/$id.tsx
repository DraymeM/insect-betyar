import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import ItemDetail from "../../../../../components/pages/ItemDetails";

const paramsSchema = z.object({
  category: z.string().min(1, "Category is required"),
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

export const Route = createFileRoute("/about/category/$category/item/$id")({
  component: ItemDetail,
  parseParams: (params) => paramsSchema.parse(params),
});
