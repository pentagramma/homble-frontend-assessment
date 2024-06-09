import { useNavigate } from "react-router-dom";
import App from '../App.css'

const ProductTile = ({ product }) => {
    const productPrice = product?.price;
    console.log('Product Price:', productPrice);

    const formattedPrice = productPrice !== undefined && typeof productPrice === 'number'
        ? productPrice.toFixed(2)
        : 'N/A';

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`/productdetails/${product.id}`);
    };

    return (
        <div className="sm:flex sm:justify-center sm:items-center">
            <div
            className="product-tile lg:h-[8cm] lg:w-[8cm] md:h-[8cm] md:w-[8cm] sm:h-[7cm] sm:w-[7cm] border border-gray-400 shadow-md hover:bg-blue-400 hover:text-white flex justify-evenly items-center rounded-md p-[10px] lg:hover:scale-105 md:hover:scale-105 hover:duration-300 mb-2"
            onClick={handleRedirect}
        >
            <div className="flex-col flex object-contain cursor-pointer justify-center items-center">
                <div className="flex justify-center items-center object-contain flex-col">
                    <h2 className="font-poppins">{product.name}</h2>
                    <img src={product.productImage} alt="" className="rounded-md " />
                </div>
                <div className="flex items-center justify-center text-[11px] italic py-1 font-medium">
                    <h1>"{product.description}."</h1>
                </div>
                <div className="price-container flex items-center justify-between flex-col mx-2 text-[14px] rounded-md w-[95%] font-abel font-bold text-gray-500">
                    <p>Rs {product.selling_price}.00</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductTile;