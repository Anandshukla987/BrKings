// CustomButton.js
import React from 'react';

const CustomButton = ({ label, onClick, isSelected }) => {
  return (
    <button
      className={`bg-transparent 
                  font-semibold py-2 
                  lg:px-4 border 
                  leading-6 shadow-sm 
                  hover:border-transparent transform transition duration-300 hover:scale-110
                  hover:bg-orange-600 
                  text-xl lg:text-2xl  
                  hover:text-black 
                  rounded pieces ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
