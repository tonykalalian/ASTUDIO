import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 9.5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 1px;
  margin-right: 10px;
`;

const SearchLabel = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <FilterContainer>
      <SearchLabel>
        <SearchIcon style={{ fontSize: "small" }} />
        Search
      </SearchLabel>
      <SearchInput
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
    </FilterContainer>
  );
};

export default GlobalFilter;
