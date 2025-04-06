import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // Auto-generated file
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Spinner from "./components/common/Spinner";
import NotFound from "./components/404/NotFound";

const router = createRouter({
  routeTree: routeTree,
  basepath: "/insect-betyar",
  defaultPendingComponent: Spinner,
  defaultNotFoundComponent: NotFound, // Set the default NotFound component
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
