import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// import { io } from "socket.io-client";

// // Create a socket connection
// const socket = io("http://localhost:4000", {
//     withCredentials: true
// });

const Chat = (props) => {
    const { name, socket } = props;
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('receiveMsg', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {

        };
    }, []);

    const sendMsg = () => {
        if (msg.trim()) {
            const data = {
                userToSend: name,
                Sender: Cookies.get('token'),
                msg: msg
            }
            socket.emit('sendMsg', data);
            setMsg('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2 bg-green-600 text-white font-semibold text-lg">
                Chat with {name}
            </div>

            {/* Messages Display Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
                        {message}
                    </div>
                ))}
            </div>

            {/* Message Input Area */}
            <div className="flex items-center border-t border-gray-200 p-2">
                <input
                    type='text'
                    placeholder='Send Msg!'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                />
                <button
                    onClick={sendMsg}
                    className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
