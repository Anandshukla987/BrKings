import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Slices/itemSlice";
import {
  selectPagination,
  setCurrentPage,
} from "../../Redux/Slices/Pagination";

const Brownies = () => {
  const { currentPage, itemsPerPage } = useSelector(selectPagination);

  const { products } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const onPageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <div className="bg-gray-950 w-full h-full">
        <div className="lg:mx-8 mx-4 flex flex-col gap-4">
          <h1 className="font text-white mt-8 text-3xl">Our brownies</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center my-4">
            {products &&
              products.slice(startIndex, endIndex).map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} image={product.images[0]} />
                </div>
              ))}
          </div>
        </div>
        <div className="pagination font-semibold flex justify-center text-lg text-orange-600 font2 gap-3 py-4 mt-3">
          <button
            className="border-2 border-orange-950/[5] p-1 rounded-sm transform transition duration-300 hover:scale-110"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="border-2 border-orange-950/[5] p-1 px-2 rounded-sm">
            {" "}
            {currentPage}
          </span>
          <button
            className="border-2 border-orange-950/[5] p-1 px-3 rounded-sm transform transition duration-300 hover:scale-110"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={endIndex >= products.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Brownies;
