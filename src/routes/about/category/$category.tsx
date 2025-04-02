import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import About from "../../../components/pages/About";

const CategorySchema = z.object({
  category: z.string().min(1, "Category is required"),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export const Route = createFileRoute("/about/category/$category")({
  component: About,
  loader: async (context) => {
    const { params } = context;
    const search = context.location.search;

    // Parse the page and limit values from the search query or set defaults
    const page = parseInt(new URLSearchParams(search).get("page") || "1", 10);
    const limit = parseInt(
      new URLSearchParams(search).get("limit") || "10",
      10
    );

    // Ensure the page and limit are valid
    const result = CategorySchema.safeParse({
      category: params.category,
      page,
      limit,
    });

    if (!result.success) {
      throw new Error(`Invalid parameters: ${result.error}`);
    }

    const { page: validatedPage = 1, limit: validatedLimit = 10 } = result.data;

    // Create a new search URL with page and limit, ensuring they're always included
    const newSearch = new URLSearchParams(search);
    newSearch.set("page", validatedPage.toString());
    newSearch.set("limit", validatedLimit.toString());

    // Return the parsed and validated parameters along with the new search string
    return { ...result.data, search: newSearch.toString() };
  },
});
