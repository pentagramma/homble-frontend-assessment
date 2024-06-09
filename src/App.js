import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails'; // Create this component as needed
import Home from './pages/Home';
import Main from './layouts/Main';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Main />}>

          <Route index element={<Home />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Route>


      </Routes>
    </>

  );
}

export default App;
