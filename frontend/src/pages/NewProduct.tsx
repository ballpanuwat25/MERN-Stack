import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const NewProducts: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="w-full h-screen-header flex flex-col items-center p-4 gap-4">
        <h1 className="text-3xl text-center mb-2"><Link to={'/products'} className="hover:underline">All products</Link> · <Link to={'/products/new'} className="underline font-bold">Add product</Link></h1>

        <div className="w-1/2 h-full bg-white rounded-xl p-4 border-2">
          <div className="w-full h-full overflow-y-scroll pr-4 flex justify-center items-center">
            <form className="w-1/2 rounded-xl border-2 p-4">
              <div className="mb-4">
                <label htmlFor="prod_name" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="prod_name"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="prod_desc" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Description
                </label>
                <textarea
                  id="prod_desc"
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

        <p>Made with ❤ by ballpanuwat25</p>
      </div>
    </div>
  );
};

export default NewProducts;