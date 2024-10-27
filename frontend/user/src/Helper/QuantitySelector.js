import React from "react";
import CustomButton from "../common/ProdCardbutton"; // Assuming you already have CustomButton defined

const QuantitySelector = ({
  quantities,
  selectedButton,
  handleButtonClick,
}) => {
  return (
    <div className="grid grid-cols-2 justify-items-stretch px-3 lg:max-w-lg gap-4 h-48">
      <p className="text-white">Quantity</p>
      {quantities.map((quantity, index) => (
        <CustomButton
          key={index}
          label={`${quantity} Brownies`}
          onClick={() => handleButtonClick(quantity)}
          isSelected={selectedButton === quantity}
        />
      ))}
    </div>
  );
};

export default QuantitySelector;
