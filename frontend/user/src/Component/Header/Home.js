import { React, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader/Loading";
import ProductFilter from "../../common/ProductFilter"; // Import the new component
import SortDropdown from "../../common/SortDropdown";
import HeroImage from "../../Images/brauni-ai (1) 1.png";
import { getProducts } from "../../Redux/Slices/itemSlice";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    price: 0,
    categories: [],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    // Fetch products on component mount
    dispatch(getProducts());
  }, [dispatch]);

  // Extract isLoading, error, and products from the Redux state
  const { products, isLoading, error } = useSelector((state) => state.item);

  // Filter products based on price, categories, and rating
  const filteredProd = (() => {
    let filtered = [...products]; // Create a copy of the products array

    if (filters.price)
      filtered = filtered.filter((item) => item.price <= filters.price);
    if (filters.categories.length > 0)
      filtered = filtered.filter((item) =>
        filters.categories.includes(item.category)
      );
    if (filters.rating)
      filtered = filtered.filter((item) => item.rating >= filters.rating);

    // Sorting logic with a copied array
    if (sortOption === "lowest") {
      filtered = [...filtered].sort((a, b) => a.price - b.price); // Create a copy before sorting
    } else if (sortOption === "highest") {
      filtered = [...filtered].sort((a, b) => b.price - a.price); // Create a copy before sorting
    }

    return filtered;
  })();

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);
  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  return (
    <>
      <div className="bg-gray-950 w-full h-full">
        <div className="lg:h-72 h-2/6 md:h-2/5 font flex flex-row bg py-1">
          <div className="md:text-3xl flex flex-col justify-center py-2 ml-2 md:ml-9 md:px-4 text-sm px-3 w-[70%] ">
            <p>A place for</p>
            <div className="md:header-subcontent font3 text-3xl font-semibold md:text-7xl md:my-4 text-white my-1">
              Imperial Treats
            </div>
            <p>
              Indulge in the royal decadence of Brownie King's heavenly creation
            </p>
          </div>
          <div className="w-[30%] imgBox">
            <img
              src={HeroImage}
              alt="Brownie"
              className="w-[100%] h-[100%] object-contain md:absolute md:top-[24px]"
            />
          </div>
        </div>

        {/* Handle loading, error, and product display */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="lg:mx-8 mx-4 flex flex-col mt-10 gap-4">
            <h1 className="font text-white text-3xl">Our Exclusive Picks</h1>
            <div className=" grid-cols-2 flex gap-2">
              <div className=" w-1/4 bg-black">
                <ProductFilter onFilterChange={handleFilterChange} />
              </div>
              <section className=" w-3/4">
                <span className=" border-b-2">
                  <SortDropdown onSortChange={handleSortChange} />{" "}
                  {/* Add the SortDropdown */}
                </span>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center my-4">
                  {filteredProd &&
                    filteredProd.slice(0, 6).map((product) => (
                      <div key={product._id}>
                        <ProductCard
                          product={product}
                          image={product.images[0]}
                        />
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        )}

        <div className="pagination font-semibold flex justify-center text-lg text-orange-600 font2 gap-3 py-4 mt-3">
          <button
            className="border-2 border-orange-950/[5] p-1 rounded-sm transform transition duration-300 hover:scale-110"
            onClick={() => navigate("/brownies")}
          >
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
