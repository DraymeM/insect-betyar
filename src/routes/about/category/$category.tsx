import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import CategoryItems from "../../../components/pages/CategorItems";

const searchSchema = z.object({
  page: z.number().int().positive().catch(1),
  limit: z.number().int().positive().catch(10),
  search: z.string().optional(),
});

export const Route = createFileRoute("/about/category/$category")({
  component: CategoryItems,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ params, deps: { search } }) => {
    return {
      category: params.category,
      initialSearch: search,
    };
  },
});
