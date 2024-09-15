import React from "react";
import { FaMinusSquare } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FormatPrice from "../../Helper/FormatPrice";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../Redux/Slices/CartSlice";

const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  // console.log(product);
  // Handle quantity change
  const onQtyChange = (newQty) => {
    if (newQty <= 0) return; // Prevent negative quantities
    dispatch(
      updateCartItemQuantity({ productId: product._id, quantity: newQty })
    );
  };

  // Handle remove item
  const handleRemove = () => {
    dispatch(removeFromCart({ productId: product._id }));
    // toast.info("Product removed from cart");
  };

  return (
    <div>
      <section>
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <img
                className="hidden h-20 w-20 dark:block"
                src={product?.images?.[0]?.url}
                alt="imac"
              />

              <label htmlFor="counter-input" className="sr-only">
                Choose quantity:
              </label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() => onQtyChange(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    <FaMinusSquare className="bg-white" />
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    id="increment-button"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() => onQtyChange(quantity + 1)}
                  >
                    <MdAddBox className="bg-white" />
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    <FormatPrice price={product.price * quantity} />
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <NavLink
                  to={`/product/${product._id}`}
                  className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                >
                  <h2>{product.title}</h2>
                  <span>{product.description}</span>
                </NavLink>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={handleRemove}
                  >
                    <RxCross2 className=" size-5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartItem;
