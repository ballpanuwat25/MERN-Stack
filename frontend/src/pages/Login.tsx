import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Products from "./Products";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Login.tsx
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:8080/auth/login", {
            username,
            password,
        })
            .then((res) => {
                const data: { authentication: { sessionToken: string } } = res.data;
                console.log(res);

                // Set token and expiration time in localStorage
                const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
                localStorage.setItem('sessionToken', data?.authentication?.sessionToken);
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                navigate('/products');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="w-full h-screen-header flex flex-col items-center justify-center p-4">
            <div className="w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl p-4 border-2">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome back!</h1>
                    <hr />
                    <h3 className="text-xl text-center mt-3"><Link to={'/login'} className="underline">Login</Link> · <Link to={'/register'} className="font-light hover:underline">Register</Link></h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-zinc-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full font-medium text-stone-50 bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:shadow-outline-zinc-800"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;