import React from "react";

const Spinner: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="spinner-border text-info" role="status"></div>
    </div>
  );
};

export default Spinner;
