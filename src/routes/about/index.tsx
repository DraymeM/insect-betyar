import { createFileRoute } from "@tanstack/react-router";
import About from "../../components/pages/About";

export const Route = createFileRoute("/about/")({
  component: About,
});
