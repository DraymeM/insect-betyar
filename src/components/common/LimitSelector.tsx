import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
      <Button type="button" className="btn bg-dark text-light border-secondary">
        {limitLabel && <span>{limitLabel} </span>}
        <span className="fw-bold">{value}</span>
      </Button>
      <Button
        className="btn bg-info text-white dropdown-toggle dropdown-toggle-split"
        onClick={toggleDropdown}
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </Button>

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
              <Button
                className="dropdown-item text-light text-center"
                onClick={() => handleLimitChange(option)}
                // Use Bootstrap's built-in hover class here
                style={{
                  backgroundColor: "transparent", // Keep it transparent
                  color: "text-white", // Default text color
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add("text-info");
                  e.currentTarget.classList.add("bg-secondary");
                  e.currentTarget.classList.remove("text-light");
                  e.currentTarget.classList.remove("bg-dark");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("text-info");
                  e.currentTarget.classList.remove("bg-secondary");
                  e.currentTarget.classList.add("text-light");
                  e.currentTarget.classList.add("bg-dark");
                }}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LimitSelector;
