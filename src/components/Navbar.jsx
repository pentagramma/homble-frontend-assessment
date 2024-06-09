import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IoIosSearch } from "react-icons/io";
import "react-dropdown/style.css";

const Navbar = () => {
  const { data: products } = useFetch("/products");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      setSearchResultsVisible(true);
    } else {
      setSearchResultsVisible(false);
    }
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

  const getProductByName = (name) => {
    if (!products) return null;
    return products.find(
      (product) => product.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filteredProducts = getFilteredProducts();

  const handleSearchClick = () => {
    const matchingProduct = getProductByName(searchQuery);
    if (matchingProduct) {
      navigate(`/productdetails/${matchingProduct.id}`);
      setSearchResultsVisible(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="max-w-screen h-[50px] shadow-md bg-blue-400 relative top-2 mx-4 rounded-full items-center flex justify-end">
      <div className="bg-white w-[250px] h-[40px] mr-1 rounded-full flex justify-between items-center relative">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="h-[40px] w-[200px] rounded-full outline-none border-none px-4 font-poppins"
        />
        <button onClick={handleSearchClick}>
          <IoIosSearch className="mr-1 bg-blue-500 rounded-full size-[35px] p-2 cursor-pointer hover:scale-105 duration-300" />
        </button>
        {searchResultsVisible && searchQuery && (
          <div className="absolute top-[45px] left-0 bg-white border border-gray-300 w-full rounded-lg shadow-lg z-10">
            {filteredProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex justify-between items-center hover:rounded-md font-poppins"
                onClick={() => {
                  setSearchQuery(product.name);
                  setSearchResultsVisible(false);
                  navigate(`/productdetails/${product.id}`);
                }}
              >
                <span>{product.name}</span>
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-[40px] h-[40px] object-contain"
                />
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="px-4 py-2 text-gray-500">
                No results found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
