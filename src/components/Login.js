import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const user = Cookies.get('token')
    if (user) {
        return <Navigate to="/" />;
    }
    const login = async () => {
        const res = await fetch('http://localhost:4000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "password": password,
            })
        });
        const data = await res.json();

        if (res.status === 200) {
            // Set the cookie with the JWT token or any data returned from login
            Cookies.set('token', data.getUser.name, { expires: 1 }); // Expires in 1 day
            navigate('/')
        }
        else {

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
                <input
                    onChange={(e) => { setName(e.target.value); }}
                    value={name}
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    onChange={(e) => { setPassword(e.target.value); }}
                    value={password}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={login}
                    className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Login
                </button>
            </div>
        </div>

    );
};

export default Login;
