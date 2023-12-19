import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem('sessionToken');
    axios.post('http://localhost:8080/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('tokenExpiration');
    }).catch((err) => console.error(err));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="text-gray-900 h-16 w-full border-b px-3 flex flex-row items-center justify-between">
      <h1 className="text-2xl font-bold">CJ IoT Assignment</h1>
      <button onClick={handleLogout} className="font-medium text-stone-50 bg-zinc-900 rounded-lg py-2 px-4 hover:bg-zinc-800">Logout</button>
    </header>
  );
};

export default Header;