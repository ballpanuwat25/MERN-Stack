import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

const NewProducts: React.FC = () => {
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('sessionToken');
    axios.post('http://localhost:8080/products', {
      prod_name: prodName,
      prod_desc: prodDesc,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
      navigate('/products');
    }).catch((err) => console.error(err));
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="w-full h-screen-header flex flex-col items-center p-4 gap-4">
        <h1 className="text-3xl text-center mb-2"><Link to={'/products'} className="hover:underline">All products</Link> · <Link to={'/products/new'} className="underline font-bold">Add product</Link></h1>

        <div className="w-1/2 h-full bg-white rounded-xl p-4 border-2">
          <div className="w-full h-full overflow-y-scroll pr-4 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-1/2 rounded-xl border-2 p-4">
              <div className="mb-4">
                <label htmlFor="prod_name" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="prod_name"
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="prod_desc" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Description
                </label>
                <textarea
                  id="prod_desc"
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                  rows={7}
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full font-medium text-stone-50 bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:shadow-outline-zinc-800"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default NewProducts;