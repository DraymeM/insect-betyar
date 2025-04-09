// main.tsx
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider, Outlet } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import Spinner from "./components/common/Spinner";
import NotFound from "./components/404/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useSystemTheme } from "./hooks/useSystemTheme";
import { CartProvider } from "./context/CartContext";
const NavBar = lazy(() => import("./components/common/NavBar"));

const AppLayout = () => {
  useSystemTheme();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <NavBar />
      </Suspense>
      <Outlet />
    </>
  );
};

const router = createRouter({
  routeTree,
  basepath: "/insect-betyar",
  defaultPendingComponent: Spinner,
  defaultNotFoundComponent: NotFound,
  context: {},
  defaultComponent: AppLayout,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
