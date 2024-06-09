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

        <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Route>
          <Route index element={<Home />} />


      </Routes>
    </>

  );
}

export default App;
