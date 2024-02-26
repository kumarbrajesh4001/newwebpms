import React from 'react';
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {

    const {handleSearch,statuses,searchTerm,} = props;

  return (
    <div className="form-field">
    <input
      type="text"
      placeholder="Search"
      className="leaveInput-search_Bar ps-2"
      onChange={handleSearch}
      value={statuses.includes(searchTerm) ? "" : searchTerm}
    />
    <span className="empList-search pointer-cur">
      <SearchIcon className="color-2E3192" />
    </span>
  </div>
  )
}

export default SearchBar
