import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
const Main = () => {
  return (
    <div className="bg-gradient-to-t from-gray-200 to-gray-300">
      <Navbar />
      
      <Outlet />
    </div>
  );
};

export default Main;
