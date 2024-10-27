import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import { fetchCartItems } from "../../Redux/Slices/CartSlice";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();

  // Get cart items and loading/error states from the Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCartItems("_"));
  }, [dispatch]);

  // console.log(cartItems.length, cartItems);
  const Pickup_Charges = 300;

  const OriginalPrice = cartItems.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  // Calculate total price dynamically
  const totalPrice = cartItems.reduce((acc, item) => {
    const itemTotal =
      (item.product.price -
        item.product?.discountPercentage * (item.product?.price / 100)) *
      item.quantity;
    return acc + itemTotal;
  }, 0);

  return (
    <div className="max-w-container bg-black ">
      <div id="header">
        <p>YOUR CART</p>
      </div>
      {cartItems?.length > 0 ? (
        <div>
          <div className="py-2 px-4 bg-black ">
            <div className="md:flex-row flex-col flex my-4 mx-3">
              <div className="md:w-[70%] md:pr-3">
                <div className="px-2 mb-4 flex-col">
                  <div className=" flex justify-center py-3 border">
                    <h5 className="mb-0 text-white">
                      Cart - {cartItems.length} items
                    </h5>
                  </div>
                  <div className="card-body">
                    {cartItems.map((cartItem) => (
                      <div key={cartItem._id}>
                        <CartItem
                          product={cartItem.product}
                          quantity={cartItem.quantity}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-[30%] border h-[50%]">
                <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <p class="text-xl font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                            Original price
                          </dt>
                          <dd class="text-base font-medium text-gray-900 dark:text-white">
                            <FormatPrice price={OriginalPrice} />
                          </dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                            Savings
                          </dt>
                          <dd class="text-base font-medium text-green-600">
                            -<FormatPrice price={OriginalPrice - totalPrice} />
                          </dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                            Pickup Charges
                          </dt>
                          <dd class="text-base font-medium text-gray-900 dark:text-white">
                            <FormatPrice price={Pickup_Charges} />
                          </dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd class="text-base font-medium text-gray-900 dark:text-white">
                            <FormatPrice price={0} />
                          </dd>
                        </dl>
                      </div>

                      <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt class="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd class="text-base font-bold text-gray-900 dark:text-white">
                          <FormatPrice price={totalPrice + Pickup_Charges} />
                        </dd>
                      </dl>
                    </div>

                    <NavLink>
                      <button class="flex w-full items-center mt-4 justify-center rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
                        Proceed to Checkout
                      </button>
                    </NavLink>

                    <div class="flex items-center justify-center gap-2">
                      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        or{" "}
                      </span>
                      <NavLink to="/">
                        <span class="inline-flex items-center gap-2 text-sm font-medium text-amber-700 underline hover:no-underline dark:text-amber-500">
                          Continue Shopping
                          <FaArrowRight />
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-2 pb-20 py-10"
        >
          <div>
            <img
              className="w-80 rounded-lg p-2 mx-auto"
              src="/Images/EmptyCart.jpeg"
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-4  flex gap-4 flex-col items-center rounded-md bg-black shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase text-white">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2 text-white">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              sweets, Brownies, Cakes etc. and make it happy.
            </p>
            <Link to="/">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-orange-600 active:bg-orange-900 px-8 py-2 font-titleFont font-semibold text-lg text-orange-300 hover:text-black duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
