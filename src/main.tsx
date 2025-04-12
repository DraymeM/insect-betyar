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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const preloadNavBar = () => import("./components/common/NavBar");
const NavBar = lazy(() => {
  const promise = preloadNavBar();
  return promise;
});

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

const router = createRouter({
  routeTree,
  basepath: "/insect-betyar",
  defaultPendingComponent: Spinner,
  defaultNotFoundComponent: NotFound,
  context: {},
  defaultComponent: AppLayout,
});

const preloadResources = () => {
  if (typeof window !== "undefined" && window.requestIdleCallback) {
    window.requestIdleCallback(() => {});
  }
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        style={{ marginTop: "3rem" }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
      />
    </CartProvider>
  </React.StrictMode>
);

preloadResources();
