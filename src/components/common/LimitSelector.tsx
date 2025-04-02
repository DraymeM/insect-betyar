import React, { useState } from 'react';

interface LimitSelectorProps {
  value: number;
  onLimitChange: (value: number) => void;
}

const LimitSelector: React.FC<LimitSelectorProps> = ({ value, onLimitChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLimitChange = (newValue: number) => {
    onLimitChange(newValue);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="btn-group">
      <button type="button" className="btn" style={{ backgroundColor: '#2b2a33', color: 'white', border:'1px solid #41d5f5' }}>
       Limit: <span style={{  color: '#41d5f5'}}>{value}</span>
      </button>

      <button
        type="button"
        className="btn dropdown-toggle dropdown-toggle-split"
        style={{ backgroundColor: '#41d5f5', color: 'white' }}
        onClick={toggleDropdown}
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-menu show"
        >
          <li>
            <a className="dropdown-item" onClick={() => handleLimitChange(5)}>
              5
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={() => handleLimitChange(10)}>
              10
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={() => handleLimitChange(20)}>
              20
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={() => handleLimitChange(25)}>
              25
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LimitSelector;
