import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slices/Cart";
import Veg from "../../Images/VEG.png";
import Brownie from "../../Images/Rectangle 4273.png";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };
    let productId = product.id;
    let productImg = product.image;
    let productTitle = product.title;
    console.log(productId);

    return (
        <>
            <section>
                <div className='py-2 px-2 my-2 border-orange-950/[5] border-4 rounded-lg max-w-sm transform transition duration-300 hover:scale-110'>
                    <div className=' rounded overflow-hidden' onClick={() => navigate('/productpage')}>
                        <img src={productImg} alt='image' className='w-full aspect-square rounded-md cursor-pointer' />
                    </div>
                    <div className='font2 text-white flex flex-col lg:flex-row max-w-sm lg:mx-2 my-4 gap-1'>
                        <div className=' gap-1 lg:w-2/3 ' onClick={() => navigate('/productpage')}>
                            <h1>{productTitle}</h1>
                            <scan>₹{productId}</scan>
                        </div>
                        <div className='flex flex-col justify-center lg:w-1/3 gap-3'>
                            <div className='flex justify-center items-center flex-col'>

                                <h1 className='flex flex-row gap-2 justify-center items-center'>Eggless <img src={Veg} alt='Veg' /></h1>
                            </div>
                            <button className="bg-orange-600 tracking-widest hover:bg-orange-500  text-white font-semibold px-4 py-1 rounded-xl text-sm overflow-hidden justify-center flex  whitespace-nowrap  w-full "
                                onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductCard;
