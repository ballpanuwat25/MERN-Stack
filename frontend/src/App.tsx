import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/products/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;