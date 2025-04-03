import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback function to handle the search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center">
      <InputGroup className="mb-6" style={{ width: "100%", maxWidth: "400px" }}>
        <FormControl
          placeholder="Keresés..."
          aria-label="Search"
          value={query}
          onChange={handleChange}
          className={`bg-dark text-light border-secondary shadow-sm placeholder-text-light`}
        />
        <Button
          variant="outline-secondary"
          onClick={handleSearch}
          style={{
            backgroundColor: "#41d5f5",
            borderColor: "#41d5f5",
            color: "#fff",
          }}
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
