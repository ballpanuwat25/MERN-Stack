import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

const UpdateProducts: React.FC = () => {
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  const navigate = useNavigate();
  const { _id } = useParams<{ _id?: string }>();

  useEffect(() => {
    if (_id) {
      getProductById(_id);
    }
  }, [_id]);

  const getProductById = async (_id: string) => {
    try {
      const token = localStorage.getItem('sessionToken');
      const response = await axios.get(`http://localhost:8080/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProdName(response.data.prod_name);
      setProdDesc(response.data.prod_desc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('sessionToken');
    axios.patch(`http://localhost:8080/products/${_id}`, {
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
                  defaultValue={prodName}
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
                  defaultValue={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                  rows={7}
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full font-medium text-stone-50 bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:shadow-outline-zinc-800"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UpdateProducts;