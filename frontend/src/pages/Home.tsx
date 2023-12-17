import React from 'react';
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-8xl font-bold">Access Denied!</h1>
      <h3 className="text-3xl">Please <Link to={'/login'} className="underline font-semibold hover:text-zinc-800">Login</Link>  to see a content.</h3>
      <h5 className="text-sm">If you haven’t an account please register <Link to={'/register'} className="underline font-semibold hover:text-zinc-800">here</Link>.</h5>
    </div>
  )
};

export default Home;