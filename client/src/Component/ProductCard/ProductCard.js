import React from "react";
import Veg from "../../Images/VEG.png";
import Brownie from "../../Images/Rectangle 4273.png";

const ProductCard = () => {
  return (
    <div>
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 my-3">
          <div className="py-2 px-2 border-orange-950/[5] border-4 rounded-lg max-w-sm">
            <div className=" rounded overflow-hidden">
              <img
                src={Brownie}
                alt="image"
                className="w-full aspect-square rounded-md cursor-pointer"
              />
            </div>
            <div className="font2 text-white flex flex-col lg:flex-row max-w-sm lg:mx-2 my-4 gap-1">
              <div className=" gap-1 lg:w-2/3">
                <h1>Double Chocolate Delight With A Taste of Walnut Crunch</h1>
                <scan className="mt-2">₹200</scan>
              </div>
              <div className="flex flex-col justify-center lg:w-1/3 gap-3">
                <div className="flex justify-center items-center flex-col">
                  <h1 className="flex flex-row gap-2 justify-center items-center">
                    Eggless <img src={Veg} alt="Veg" />
                  </h1>
                </div>
                <button className="bg-orange-600 tracking-widest hover:bg-orange-500  text-white font-semibold px-4 py-1 rounded-xl text-sm overflow-hidden justify-center flex  whitespace-nowrap  w-full ">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="py-2 px-2 border-orange-950/[5] border-4 rounded-lg max-w-sm">
            <div className=" rounded overflow-hidden">
              <img
                src={Brownie}
                alt="image"
                className="w-full aspect-square rounded-md cursor-pointer"
              />
            </div>
            <div className="font2 text-white flex flex-col lg:flex-row max-w-sm lg:mx-2 my-4 gap-1">
              <div className=" gap-1 lg:w-2/3">
                <h1>Double Chocolate Delight With A Taste of Walnut Crunch</h1>
                <scan className="mt-2">₹200</scan>
              </div>
              <div className="flex flex-col justify-center lg:w-1/3 gap-3">
                <div className="flex justify-center items-center flex-col">
                  <h1 className="flex flex-row gap-2 justify-center items-center">
                    Eggless <img src={Veg} alt="Veg" />
                  </h1>
                </div>
                <button className="bg-orange-600 hover:bg-orange-500 tracking-widest  text-white font-semibold px-4 py-1 rounded-xl text-sm overflow-hidden justify-center flex  whitespace-nowrap  w-full ">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="py-2 px-2 border-orange-950/[5] border-4 rounded-lg max-w-sm">
            <div className=" rounded overflow-hidden">
              <img
                src={Brownie}
                alt="image"
                className="w-full aspect-square rounded-md cursor-pointer"
              />
            </div>
            <div className="font2 text-white flex flex-col lg:flex-row max-w-sm lg:mx-2 my-4 gap-1">
              <div className=" gap-1 lg:w-2/3">
                <h1>Double Chocolate Delight With A Taste of Walnut Crunch</h1>
                <scan className="mt-2">₹200</scan>
              </div>
              <div className="flex flex-col justify-center lg:w-1/3 gap-3">
                <div className="flex justify-center items-center flex-col">
                  <h1 className="flex flex-row gap-2 justify-center items-center">
                    Eggless <img src={Veg} alt="Veg" />
                  </h1>
                </div>
                <button className="bg-orange-600 hover:bg-orange-500 tracking-widest  text-white font-semibold px-4 py-1 rounded-xl text-sm overflow-hidden justify-center flex  whitespace-nowrap  w-full ">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
