import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductTile from "./ProductTile";
import AddProductModal from "./AddProductModal";

import "react-dropdown/style.css";

const ProductList = () => {
  const { data: products, loading, error } = useFetch("/products");
  const [showModal, setShowModal] = useState(false);
  const [sortType, setSortType] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchResultsVisible(true);
  };

  const getSortedProducts = () => {
    if (!products) return [];
    return [...products].sort((a, b) => {
      if (sortType === "price") {
        if (sortOrder === "asc") {
          return a.selling_price - b.selling_price;
        } else {
          return b.selling_price - a.selling_price;
        }
      } else if (sortType === "name") {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
      return 0;
    });
  };

  const getFilteredProducts = () => {
    if (!products) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );
  };

  const sortedProducts = getSortedProducts();
  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 pl-10 mt-[150px]">
          {Array(9)
            .fill()
            .map((_, index) => (
              <div
                className="bg-gray-200 mx-3 animate-pulse rounded-lg shadow-md p-4 flex flex-col items-center"
                key={index}
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[145%] bg-gray-200">
      

      <div className="container mx-auto w-full mt-5">
      <div className="flex flex-col md:flex-row sm:items-center py-5 justify-between">
          <h1 className="text-3xl font-medium font-poppins mb-4 md:mb-0 border-b-2 border-gray-500 product-title">Products</h1>
          <div className='flex flex-col md:flex-row items-center font-poppins'>
            <h1 className="mr-2 mb-2 md:mb-0">Sort by</h1>
            <div className='flex mb-2 md:mb-0 md:mr-10 '>
              <select className='border px-2 py-1 w-[100px] md:mr-2' value={sortType} onChange={handleSortTypeChange}>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
              <select className='border px-2 py-1 w-[185px]' value={sortOrder} onChange={handleSortOrderChange}>
                {sortType === 'price' ? (
                  <>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </>
                ) : (
                  <>
                    <option value="asc">Alphabetical</option>
                    <option value="desc">Reverse Alphabetical</option>
                  </>
                )}
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:scale-105 duration-300 font-poppins"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 pl-10">
          {sortedProducts.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
        {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default ProductList;
