import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { TbReceiptTax } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import QuantitySelector from "../../Helper/QuantitySelector";
import WeightSelector from "../../Helper/WeightSelector";
import { addProductToCart } from "../../Redux/Slices/CartSlice";
import {
  getProductByIdAsync,
  selectProductById,
  selectProductError,
  selectProductStatus,
} from "../../Redux/Slices/itemSlice";
import ImageGallery from "../../common/ImageGallery";
import Loader from "../../common/Loader/Loading";
import LikeProduct from "../ProductCard/LikeProduct";
import "./Product.css";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);
  const quantities = [4, 8, 16]; // Define the quantities here
  const [weight, setWeight] = useState(0.5); // Initial weight set to 0.5 kg as an example
  const { id } = useParams(); // Use destructuring for cleaner code

  // Redux selectors
  const product = useSelector(selectProductById);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const discount_price =
    product?.price - product?.discountPercentage * (product?.price / 100);

  const handleButtonClick = (quantity) => {
    setSelectedButton(quantity);
    // Handle further actions for quantity selection
  };

  const handleWeightChange = (event) => {
    setWeight(parseFloat(event.target.value));
    // Handle further actions for weight change
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdAsync(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addProductToCart({
          productId: product._id,
          quantity: 1,
          size: product.size,
        })
      );
    }
  };

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    ); // Show loading state
  }

  if (status === "idle" && error) {
    return <div className="text-white">Error: {error}</div>; // Show error state
  }

  return (
    <>
      {product && (
        <div className="flex flex-col justify-between bg-gray-950 lg:gap-8">
          <section>
            <div className="flex flex-col gap-2 justify-between lg:flex-row mt-3 mx-4 lg:mx-8">
              {/* Pass the images prop to the ImageGallery component */}
              <ImageGallery images={product?.images || []} />
              <div className="flex flex-col mt-3 lg:px-6 gap-42 lg:w-2/3 lg:h-full lg:mx-5  mx-3">
                <div className="flex flex-col gap-2 lg:mr-16">
                  <h1 className="text-2xl lg:text-3xl font-semibold text-white font">
                    {product.title}
                  </h1>
                  <h4 className="text-semibold text-xl lg:text-2xl my-3 text-white font">
                    <div className=" line-through">
                      <FormatPrice price={product?.price} />
                    </div>
                    <FormatPrice price={discount_price} />
                    <p className=" text-base flex flex-row items-center">
                      <span className="p-1.5">
                        <TbReceiptTax />
                      </span>
                      Tax Included
                    </p>
                  </h4>
                  <p className="text-semibold text-white font text-sx lg:text-lg font">
                    Double Chocolate Delight With A Taste of Walnut Crunch is a
                    recipe for double chocolate cookies with lots of walnuts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 max-w-screen-md mt-4">
                  {product?.category === "Jar-cake" ? (
                    <WeightSelector
                      weight={weight}
                      handleWeightChange={handleWeightChange}
                    />
                  ) : (
                    <QuantitySelector
                      quantities={quantities}
                      selectedButton={selectedButton}
                      handleButtonClick={handleButtonClick}
                    />
                  )}
                  <div className="flex justify-around flex-wrap">
                    <button
                      className="mt-3 rounded-md bg-amber-600 px-2 py-1.5 lg:mx-6 text-xl font-semibold leading-10 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  transform transition duration-300 hover:scale-110"
                      onClick={handleAddToCart}
                    >
                      <span className="flex justify-center text-center items-center gap-2">
                        <FaCartArrowDown />
                        Add to Cart
                      </span>
                    </button>
                    <NavLink to="/cart">
                      <button
                        className="mt-3 rounded-md min-w-40 bg-amber-600 px-2 py-1.5 lg:mx-6 text-xl font-semibold leading-10 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transform transition duration-300 hover:scale-110"
                        onClick={handleAddToCart}
                      >
                        <span className="flex justify-center text-center items-center gap-2">
                          <AiFillThunderbolt />
                          Buy Now
                        </span>
                      </button>
                    </NavLink>
                  </div>
                  <h4 className="font text-white lg:mt-6 my-3 lg:px-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.description),
                      }}
                    />
                  </h4>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex border border-orange-500 my-4 mx-4 lg:mx-16 rounded-md flex-col lg:flex-row mt-4">
              <div className="rounded overflow-hidden max-w-sm">
                <img
                  src="/Images/Rectangle2.png"
                  alt="experience"
                  className="w-full"
                />
              </div>
              <div className="bg-orange-500">
                <div className="py-2 px-3">
                  <h2 className="font font-bold text-3xl text-black lg:text-5xl my-2">
                    Experience The Taste & Texture Of World Class Brownies
                  </h2>
                  <p className="font text-2xl lg:text-3xl text-black">
                    Indulge in the pure bliss of our world-class brownies. Each
                    bite is a symphony of rich, decadent chocolate that melts on
                    your tongue, enveloping your senses in pure indulgence.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="w-full h-36 flex justify-center items-center quote my-3 lg:mt-8">
              <div className="bg-[#4b2508] rounded-2xl px-2 mx-4 h-18">
                <h1 className="text-white font lg:text-4xl px-2 py-2">
                  There is nothing better than a friend unless it is a friend
                  with chocolate.
                </h1>
              </div>
            </div>
          </section>
        </div>
      )}
      <div className="h-full w-full bg-gray-950">
        <div className="mx-8 flex flex-col gap-4">
          <h1 className="font text-white mt-8 text-3xl">You may also like</h1>
          <div className="mb-4">
            <LikeProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
