import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";

const ProductCard = ({ product, image }) => {
  return (
    <>
      <NavLink to={`/product/${product._id}`}>
        <div className="py-2 px-2 my-1 overflow-hidden border-black bg-black border-4 rounded-lg max-w-xs transform transition duration-300 hover:scale-110">
          {/* Conditionally render the "Popular" tag */}
          {product.tags && (
            <div class="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-1 right-[-52px] top-[15px] w-[165px]">
              {product.tags}
            </div>
          )}
          <div className=" rounded overflow-hidden">
            <img
              src={image?.url}
              alt="Brownie"
              className="w-full aspect-square rounded-md cursor-pointer"
            />
          </div>
          <div className="font2 text-white flex flex-col max-w-xs lg:mx-2 h-16 gap-1 bg-zinc-950 transform translate-y-0 transition duration-300 hover:-translate-y-5 hover:scale-x-110">
            <h1 className="p-1 font-extrabold">{product.title}</h1>
            <div className="flex justify-between">
              <span>
                <FormatPrice price={product?.price} />
              </span>
              <p className="flex gap-1">
                <img className=" max-w-5" src="/Images/VEG.png" alt="Veg" />
                Eggless
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ProductCard;
