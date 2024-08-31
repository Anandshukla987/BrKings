import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EmptyCart from "../../Images/Free market or Amazon.jpeg";
// import CartPro from "../../Redux/API/items.json";
import CartProduct from "./CartProduct";
import "./Cart.css";
import {
  getCartTotal,
} from "../../Redux/Slices/Cart";

const Cart = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <div className="max-w-container bg-black ">
      <div id="header">
        <p>YOUR CART</p>
      </div>
      {cart?.length > 0 ? (
        <div>
          <div className="py-2 px-2 bg-black ">
            <div className="md:flex-row flex-col flex my-4 mx-3">
              <div className="md:w-[70%] md:pr-3">
                <div className="px-2 mb-4 flex-col">
                  <div className=" flex justify-center py-3 border">
                    <h5 className="mb-0 text-white">
                      Cart - {cart.length} items
                    </h5>
                  </div>
                  <div className="card-body">
                    {cart?.map((data) => (
                      <div key={data._id}>
                        <CartProduct data={data} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-[30%] border h-[50%]">
                <div className="flex flex-col mb-4">
                  <div className="flex text-white justify-center py-3">
                    <h5>Summary</h5>
                  </div>
                  <div className="border-t px-2 pt-2">
                    <div className="flex text-white justify-between my-2">
                      Total Quantity
                      <span>{totalQuantity}</span>
                    </div>

                    <div className="flex text-white justify-between my-2">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>₹{totalPrice}</strong>
                      </span>
                    </div>

                    <button className="bg-primeColor border rounded-md cursor-pointer hover:bg-orange-600 active:bg-orange-900 px-9 py-2 font-titleFont font-semibold text-lg text-orange-400 hover:text-black duration-300">
                      Go to Checkout
                    </button>
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
              src={EmptyCart}
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
