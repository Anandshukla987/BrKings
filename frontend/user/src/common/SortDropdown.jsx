// src/components/SortDropdown/SortDropdown.js
import React from "react";

const SortDropdown = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    onSortChange(sortOption);
  };

  return (
    <div className="sort-dropdown flex justify-end mt-0.5 border-b-2 p-2">
      <label htmlFor="sort" className="text-white font-semibold">
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        onChange={handleSortChange}
        className="ml-2 px-3 py-1 bg-black text-white rounded-md"
      >
        <option value="none">No Sorting</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
