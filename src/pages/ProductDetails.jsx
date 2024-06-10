import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { IoIosArrowBack } from "react-icons/io";
import LoadingSpinner from '../Loading/loading2.gif';
import { FaPlus } from "react-icons/fa6";
import { instance } from "../axios";
import Loadingg from '../Loading/loading2.gif'

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: product, loading: fetchLoading, error } = useFetch(`https://frontend-assessment-server.onrender.com/api/products/${id}`);

    if (fetchLoading) {
        return <div className='flex items-center justify-center w-screen h-screen'><img src={LoadingSpinner} alt="Loading..." className='w-[40px] h-[40px]'/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await instance.post("/products", {
                name: product.name,
                description: product.description,
                allergens: product.allergen_info,
            });
            setLoading(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        } catch (error) {
            setLoading(false);
            console.error("Something went wrong!", error);
        }
    };

    const details = [
        {
            tag: 1,
            value: 'Description',
            value2: 'description',
        },
        {
            tag: 2,
            value: 'Allergen Info',
            value2: 'allergen_info',
        },
        {
            tag: 1,
            value: 'Cooking Instructions',
            value2: 'cooking_instruction',
        },
    ];

    const handleRedirect = () => {
        navigate(`/`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <div className="w-full flex justify-start px-3 md:px-3 lg:px-3">
                <button 
                    className='bg-gradient-to-r from-blue-950 to-blue-800 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 py-2 md:py-2 lg:py-2 rounded-2xl hover:shadow-black hover:shadow text-white flex items-center justify-between px-3 md:px-3 lg:px-3 hover:scale-105 duration-300 mb-4' 
                    onClick={handleRedirect}
                >
                    <IoIosArrowBack className='pr-1'/>
                    <p className='pr-1 font-poppins'>Back</p>
                </button>
            </div>
            <div className='item-card flex flex-col justify-center items-center border-gray-400 border rounded-md shadow-2xl max-w-xs sm:max-w-sm md:w-[500px] lg:max-[500px] p-2 sm:p-2 md:p-2 lg:p-2 bg-gray-200'>
                <div className='flex justify-center items-center flex-col'>
                    <img src={product.productImage} alt={product.name} className='rounded-md w-full max-w-xs md:max-w-sm lg:max-w-md'/>
                </div>
                <div className='rounded-md flex-row flex justify-between items-center font-abel text-xl md:text-2xl w-full mt-2'>
                    <div>
                        <h1 className='font-poppins text-2xl md:text-3xl border-b-2'>{product.name}</h1>
                        <h1 className='font-bold text-gray-500'>Rs {product.selling_price}.00</h1>
                    </div>
                    <div className='tooltip-container '>
                        {loading ? (
                            <p className='font-poppins text-blue-950'><img src={Loadingg} alt="" className='size-[30px] m-4'/></p>
                        ) : (
                            <button className='add-btn cursor-pointer hover:scale-105 duration-300 border-none' onClick={handleSubmit}>
                                <FaPlus className='bg-gradient-to-r from-blue-950 to-blue-800 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 text-white rounded-full size-[50px] hover:shadow-black hover:shadow relative mr-2 '/>
                            </button>
                        )}
                        <span className="tooltip-text">Add Product</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-start mt-10 w-full max-w-2xl'>
                {details.map((detail, index) => (
                    <div key={index} className='mb-4 w-full'>
                        <h2 className='font-medium text-xl md:text-2xl lg:text-3xl border-b-2 border-gray-700 flex mb-2 py-1 font-poppins'>
                            {detail.value.charAt(0).toUpperCase() + detail.value.slice(1)}
                        </h2>
                        <p className={detail.value2 === 'description' ? 'italic text-lg md:text-xl lg:text-2xl text-gray-500' : 'text-lg text-gray-500 md:text-xl lg:text-2xl font-poppins font-light'}>
                            {detail.value2 === 'description'
                                ? `"${product[detail.value2]}"`
                                : product[detail.value2]}
                        </p>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p className="text-xl font-poppins">Request sent</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
