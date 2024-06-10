import { useNavigate } from "react-router-dom";
import App from '../App.css'
import { useState } from 'react';


const ProductTile = ({ product, onRemove  }) => {
    const productPrice = product?.price;
    console.log('Product Price:', productPrice);

 
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`/productdetails/${product.id}`);
    };

    const [showPopOut, setShowPopOut] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(true);
        setTimeout(() => {
            onRemove(product.id);
        }, 500);
    };

    

    return (
        <>
        <div className="sm:flex justify-center items-center main-div flex flex-col">
            <div
                className="product-tile lg:h-[8cm] lg:w-[8cm] md:h-[8cm] md:w-[8cm] sm:h-[7cm] sm:w-[7cm] border border-gray-300  hover:bg-blue-400 hover:text-white flex justify-evenly items-center rounded-md p-[10px] lg:hover:scale-105 md:hover:scale-105 hover:duration-300 mb-1 sm:mb-1 lg:hover:drop-shadow-md md:hover:drop-shadow-md"
                onClick={handleRedirect}
                onMouseEnter={() => setShowPopOut(true)}
                onMouseLeave={() => setShowPopOut(false)}
                
            >
                <div className="flex-col flex object-contain cursor-pointer justify-start items-start w-full">
                   
                    
                    
                    <div className="flex justify-center items-center object-contain flex-col w-full">
                        <h2 className="italic text-[12px] pb-1">"{product.description}"</h2>
                        <img src={product.productImage} alt="" className="rounded-md" />
                    </div>
                    
                    
                    <div className="flex items-start justify-start text-[15px] font-poppins py-1 font-medium w-[95%] mx-2">
                        <h1>{product.name}</h1>
                    </div>
                  
                    <div className="price-container flex items-start justify-start flex-col mx-2 text-[14px] rounded-md w-[95%] font-abel font-bold text-gray-500">
                        <p>Rs {product.selling_price}.00</p>
                    
                    
                    </div>
                </div>
                
            </div>
            <div className=" lg:w-[8cm] md:w-[8cm] w-[7.6cm] flex justify-center items-center mb-2 border-gray-300 border rounded-md flex-row mt-1 lg:hover:drop-shadow-md md:hover:shadow-md">
                <input type="checkbox" name="" id="" className='cursor-pointer' onChange={handleCheckboxChange}/> 
                <h2 className="font-poppins mx-2 text-[12px]">Remove this item</h2>
            </div>
        </div>
        
        </>
    );
};

export default ProductTile;
