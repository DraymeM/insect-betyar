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
import { ToastContainer } from "react-toastify"; // Import Toastify Container
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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
      {/* Wrap your app with ToastContainer to display toasts globally */}
      <ToastContainer
        position="top-right"
        style={{ marginTop: "3rem" }} // Added marginTop to apply spacing
        autoClose={3000} // Toast auto-closes after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="colored" // Colored theme (e.g., green for success, red for error)
      />
    </CartProvider>
  </React.StrictMode>
);

// Kick off preloading after render
preloadResources();
