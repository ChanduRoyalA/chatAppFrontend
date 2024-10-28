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
        <div>
            <input onChange={(e) => { setName(e.target.value) }} value={name} type='text' placeholder='name' />
            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type='password' placeholder='password' />
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;
