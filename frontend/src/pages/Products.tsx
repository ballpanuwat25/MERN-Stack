import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    checkTokenExpiry();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const checkTokenExpiry = () => {
    const token = localStorage.getItem('sessionToken');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      // Check if the token has expired
      if (currentTime > parseInt(expirationTime, 10)) {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('tokenExpiration');
      } else {
        getProducts();
      }
    } else {
      console.log('Token not found in localStorage.');
    }
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="w-full h-screen-header flex flex-col items-center p-4 gap-4">
        <h1 className="text-3xl text-center mb-2"><Link to={'/products'} className="underline font-bold">All products</Link> · <Link to={'/products/new'} className="hover:underline">Add product</Link></h1>

        <div className="w-1/2 h-full bg-white rounded-xl p-4 border-2">
          <div className="w-full h-full overflow-y-scroll pr-4">
            <table className='min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden'>
              <thead className='bg-zinc-800 text-white'>
                <tr>
                  <th className='py-2 px-4 border-b border-r text-start'>id</th>
                  <th className='py-2 px-4 border-b border-r text-start'>prod_name</th>
                  <th className='py-2 px-4 border-b border-r text-start'>prod_desc</th>
                  <th className='py-2 px-4 border-b text-start'>actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className='py-2 px-4 border-b border-r'>{index + 1}</td>
                    <td className='py-2 px-4 border-b border-r'>{product.prod_name}</td>
                    <td className='py-2 px-4 border-b border-r'>{product.prod_desc}</td>
                    <td className='py-2 px-4 border-b'>
                      <Link to={`/edit/${product.id}`} className='text-blue-500 mr-2'>Edit</Link>
                      <button onClick={() => deleteProduct(product.id)} className='text-red-500'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p>Made with ❤ by ballpanuwat25</p>
      </div>
    </div>
  );
};

export default Products;