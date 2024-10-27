import React from "react";

const WeightSelector = ({ weight, handleWeightChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-white">Weight in Kg</p>
      <select
        value={weight}
        onChange={handleWeightChange}
        className="p-2 border rounded-md text-lg bg-black text-white"
      >
        {[0.5, 1, 1.5, 2].map((wt) => (
          <option key={wt} value={wt}>
            {wt} Kg
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeightSelector;
