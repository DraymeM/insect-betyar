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

// Preload NavBar component during idle time
const preloadNavBar = () => import("./components/common/NavBar");

// Lazy load with prefetch
const NavBar = lazy(() => {
  // Start loading immediately but return a promise
  const promise = preloadNavBar();
  return promise;
});

// Memoized AppLayout to prevent unnecessary re-renders
const AppLayout = React.memo(() => {
  useSystemTheme();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <NavBar />
      </Suspense>
      <Outlet />
    </>
  );
});

// Create router once and reuse
const router = createRouter({
  routeTree,
  basepath: "/insect-betyar",
  defaultPendingComponent: Spinner,
  defaultNotFoundComponent: NotFound,
  context: {},
  defaultComponent: AppLayout,
});

// Start preloading other resources after initial render
const preloadResources = () => {
  if (typeof window !== "undefined" && window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      // Preload other critical resources here if needed
    });
  }
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Initial render
root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

// Kick off preloading after render
preloadResources();
