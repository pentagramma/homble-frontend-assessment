import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

const Navbar = ({ searchResults, handleSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() !== '') {
            setSearchResultsVisible(true);
            handleSearchResults(query);
        } else {
            setSearchResultsVisible(false);
        }
    };

    const handleSearchClick = () => {
        const matchingProduct = searchResults.find(
            (product) => product.name.toLowerCase() === searchQuery.toLowerCase()
        );
        if (matchingProduct) {
            navigate(`/productdetails/${matchingProduct.id}`);
            setSearchResultsVisible(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="max-w-screen h-[60px] shadow-md bg-gradient-to-r from-blue-950 to-blue-800 relative top-2 mx-4 rounded-full items-center flex justify-end">
            <div className="bg-white w-[250px] h-[40px] mr-3 rounded-full flex justify-between items-center relative">
                <input
                    type="text"
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="h-[40px] w-[200px] rounded-full outline-none border-none px-4 font-poppins"
                />
                <button onClick={handleSearchClick}>
                    <IoIosSearch className="mr-2 bg-blue-800 hover:bg-blue-900 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 rounded-full size-[30px] p-2 cursor-pointer hover:scale-105 duration-300 hover:shadow-black hover:shadow text-white" />
                </button>
                {searchResultsVisible && searchQuery.trim() !== '' && (
                    <div className="absolute top-[45px] left-0 bg-white border border-gray-300 w-full rounded-lg shadow-lg z-10">
                        {searchResults.map((product) => (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
