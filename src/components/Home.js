import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AllContancts from './AllContancts';
import { io } from "socket.io-client";

// Create a socket connection
const socket = io("http://localhost:4000", {
    withCredentials: true
});


function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        // Check for user cookie once on component mount
        const user = Cookies.get('token');
        const details = {
            user
        };
        socket.emit('sendconnection', details);
        return () => {
            // socket.off('connection');
            // socket.off('receiveMsg');
        };
    }, []); // Only run this effect once
    const logout = () => {
        const data = {
            user: Cookies.get('token')
        }
        socket.emit('disconnectClient', data);
        Cookies.remove('token');
        navigate('/login');
    }
    if (!Cookies.get('token')) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <nav className='px-5 py-4 flex justify-end'><button className='mr-3 bg-red-500 text-white px-4 py-1 rounded' onClick={logout}>Logout</button></nav>
            <div>
                <AllContancts socket={socket} />
            </div>
        </div>
    );
}

export default Home;
