import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="text-gray-900 h-16 w-full border-b px-3 flex flex-row items-center justify-between">
      <h1 className="text-2xl font-bold">CJ IoT Assignment</h1>
      <Link to={'/'} className="font-medium text-stone-50 bg-zinc-900 rounded-lg py-2 px-4 hover:bg-zinc-800">Logout</Link>
    </header>
  );
};

export default Header;