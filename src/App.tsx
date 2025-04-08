import { Outlet } from "@tanstack/react-router";
import React from "react";
const NavBar = React.lazy(() => import("./components/common/NavBar"));
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useSystemTheme } from "./hooks/useSystemTheme";

const App: React.FC = () => {
  useSystemTheme();

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
