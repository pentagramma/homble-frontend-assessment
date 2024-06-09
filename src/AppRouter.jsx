import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
