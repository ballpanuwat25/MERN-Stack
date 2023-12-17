import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    return (
        <div className="w-full h-screen-header flex flex-col items-center justify-center p-4">
            <div className="w-1/4 bg-white rounded-xl p-4 border-2">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-center mb-4">Create you account!</h1>
                    <hr />
                    <h3 className="text-xl text-center mt-3"><Link to={'/login'} className="font-light hover:underline">Login</Link> · <Link to={'/register'} className="underline">Register</Link></h3>
                </div>

                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full font-medium text-stone-50 bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:shadow-outline-zinc-800"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Register;