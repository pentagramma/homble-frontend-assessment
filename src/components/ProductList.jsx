import React, { useState, useEffect, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import ProductTile from './ProductTile';
import AddProductModal from './AddProductModal';
import Navbar from './Navbar';
import { CgSmileSad } from 'react-icons/cg';

const ProductList = () => {
    const { data: products, loading, error } = useFetch('/products');
    const [showModal, setShowModal] = useState(false);
    const [sortType, setSortType] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (products) {
            setProductList(products);
        }
    }, [products]);

    const handleSortTypeChange = (event) => {
        setSortType(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setProductList(products);
        }
    };

    const handleRemoveProduct = (productId) => {
        setProductList((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    const getSortedProducts = useMemo(() => {
        if (!productList) return [];
        return [...productList].sort((a, b) => {
            if (sortType === 'price') {
                return sortOrder === 'asc' ? a.selling_price - b.selling_price : b.selling_price - a.selling_price;
            } else if (sortType === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            return 0;
        });
    }, [productList, sortType, sortOrder]);

    const getFilteredProducts = useMemo(() => {
        if (!productList) return [];
        const lowercasedQuery = searchQuery.toLowerCase().trim();
        return getSortedProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) ||
                product.description.toLowerCase().includes(lowercasedQuery)
        );
    }, [productList, searchQuery, getSortedProducts]);

    const skeletonLoader = (
        <div className="animate-pulse flex flex-col space-y-4">
            <div className="bg-gray-300 h-10 w-full rounded-md"></div>
            <div className="flex space-x-4">
                <div className="bg-gray-300 h-8 w-24 rounded-md"></div>
                <div className="bg-gray-300 h-8 w-32 rounded-md"></div>
                <div className="bg-gray-300 h-8 w-40 rounded-md"></div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="w-full h-full min-h-screen bg-gray-200 absolute bottom-4">
                <div className="w-full h-full min-h-screen bg-gray-200">
                    <div className="container mx-auto px-4 mt-5">
                        <div className="flex flex-col md:flex-row sm:items-center py-5 justify-evenly">
                            {skeletonLoader}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 pl-10 mt-[150px]">
                            {Array(9)
                                .fill()
                                .map((_, index) => (
                                    <div className="bg-gray-200 mx-3 animate-pulse rounded-lg shadow-md p-4 flex flex-col items-center" key={index}>
                                        <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                                        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                                        <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
                                        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                                    </div>
                                ))}
                        </div>
                    </div>
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
        <div className="min-h-screen w-full bg-gray-200">
            <Navbar searchResults={getFilteredProducts} handleSearchResults={handleSearchChange} />
            <div className="container mx-auto w-full mt-5">
                <div className="flex flex-col md:flex-row sm:items-center py-5 justify-evenly">
                    <h1 className="text-3xl font-medium font-poppins mb-4 md:mb-0 border-b-2 border-gray-500 product-title">
                        Products
                    </h1>
                    <div className="flex flex-col md:flex-row items-center font-poppins">
                        <h1 className="mr-2 mb-2 md:mb-1">Sort by</h1>
                        <div className="flex mb-2 md:mb-0 md:mr-10">
                            <select
                                className="border px-2 py-1 w-[100px] md:mr-2 cursor-pointer"
                                value={sortType}
                                onChange={handleSortTypeChange}
                            >
                                <option value="price">Price</option>
                                <option value="name">Name</option>
                            </select>
                            <select
                                className="border px-2 py-1 w-[185px] cursor-pointer"
                                value={sortOrder}
                                onChange={handleSortOrderChange}
                            >
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
                            className="bg-blue-400 text-white px-4 py-2 rounded-2xl hover:scale-105 duration-300 font-poppins hover:shadow-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
                {getFilteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 sm:pl-10">
                        {getFilteredProducts.map((product) => (
                            <ProductTile key={product.id} product={product} onRemove={handleRemoveProduct} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[15cm] bg-gray-300 rounded-lg">
                        <p className="text-xl font-medium font-poppins justify-center flex items-center">
                            <CgSmileSad className="mx-1" />
                            No products found
                        </p>
                    </div>
                )}
                {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default ProductList;
