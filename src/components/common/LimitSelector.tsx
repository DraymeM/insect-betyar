import React, { useState } from "react";

interface LimitSelectorProps {
  value: number;
  options: (string | number)[];
  onLimitChange: (value: number) => void;
  limitLabel?: string | null; // Optional prop, can be null or a string
}

const LimitSelector: React.FC<LimitSelectorProps> = ({
  value,
  options,
  onLimitChange,
  limitLabel = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLimitChange = (newValue: string | number) => {
    const parsedValue =
      typeof newValue === "string" ? parseInt(newValue, 10) : newValue;
    onLimitChange(parsedValue);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="btn-group">
      <button type="button" className="btn bg-dark text-white border-secondary">
        {limitLabel && <span>{limitLabel} </span>}
        <span className="fw-bold">{value}</span>
      </button>
      <button
        type="button"
        className="btn bg-info text-white dropdown-toggle dropdown-toggle-split"
        onClick={toggleDropdown}
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>

      {isDropdownOpen && (
        <ul
          className="dropdown-menu show bg-dark border border-secondary"
          style={{
            top: "100%",
            left: 0,
            minWidth: "7rem",
            backgroundColor: "transparent",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
          }}
        >
          {options.map((option, index) => (
            <li key={index}>
              <button
                type="button"
                className="dropdown-item text-white text-center"
                onClick={() => handleLimitChange(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LimitSelector;
