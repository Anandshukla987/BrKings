// src/components/ProductFilter/ProductFilter.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormatPrice from "../Helper/FormatPrice";
import { getCategories } from "../Redux/Slices/itemSlice";

const ProductFilter = ({ onFilterChange, minPrice, maxPrice }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [price, setPrice] = useState(maxPrice);
  const { productCategories } = useSelector((state) => state.item);

  useEffect(() => {
    // Fetch products on component mount
    dispatch(getCategories());
  }, [dispatch]);

  // Handle price slider change
  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    onFilterChange({
      price: newPrice,
      categories: selectedCategories,
      rating: selectedRating,
    });
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategories((prevCategories) =>
      isChecked
        ? [...prevCategories, category]
        : prevCategories.filter((c) => c !== category)
    );

    onFilterChange({
      price: 0,
      categories: isChecked
        ? [...selectedCategories, category]
        : selectedCategories.filter((c) => c !== category),
      rating: selectedRating,
    });
  };

  // Handle rating change
  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value, 10);
    setSelectedRating(rating);
    onFilterChange({ price: 0, categories: selectedCategories, rating });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setPrice(0);
    setSelectedCategories([]);
    setSelectedRating(0);
    onFilterChange({ price: 0, categories: [], rating: 0 });
  };

  return (
    <div className="filter-container p-2 gap-1">
      <h2 className="text-white border-b-2 font-bold text-lg mb-1 p-2">
        Filters
      </h2>

      {/* Price Slider */}
      <div className=" mt-2 border-b-2 p-2">
        <h3 className="text-white">Price</h3>
        <p className="text-white">
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={handlePriceChange}
          className="w-full mt-0.2"
        />
      </div>

      {/* Category Filter */}
      <div className="filter-category mt-2 border-b-2 p-2">
        <label className="text-white font-semibold">Categories:</label>
        <div className="mt-2 px-1 pb-2">
          {productCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={category.title}
                value={category.title}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category.title)}
                className="mr-2"
              />
              <label htmlFor={category.title} className="text-white">
                {category.title}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter with Radio Buttons */}
      <div className="filter-rating mt-2 p-2">
        <label className="text-white">Minimum Rating:</label>
        <div className="mt-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <div key={rating}>
              <input
                type="radio"
                name="rating"
                value={rating}
                id={`rating-${rating}`}
                onChange={handleRatingChange}
                checked={selectedRating === rating}
                className="mr-2"
              />
              <label htmlFor={`rating-${rating}`} className="text-white">
                {rating === 0
                  ? "All Ratings"
                  : `${rating} Star${rating > 1 ? "s" : ""} & Up`}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;
