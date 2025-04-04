import { Outlet } from "@tanstack/react-router";
import React from "react";
const NavBar = React.lazy(() => import("./components/common/NavBar"));

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
