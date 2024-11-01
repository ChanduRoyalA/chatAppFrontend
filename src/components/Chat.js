import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Chat = (props) => {
    const { name, socket } = props;
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const userToken = Cookies.get('token');

    useEffect(() => {
        const handleMessage = (message) => {
            if (message.error) {
                return;
            }
            // console.log("Received message:", message);
            if (message && message.msg) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { msg: message.msg, Sender: message.Sender, time: formatTime(new Date()) }
                ]);
            }
        };



        socket.on('receiveMsg', handleMessage);

        // Error handling for sending messages
        socket.on('errorSendingMsg', (data) => {
            toast.error(data.error);
        });

        // Clean up listeners when the component unmounts
        return () => {
            socket.off('receiveMsg', handleMessage);
            socket.off('errorSendingMsg');
        };
    }, [socket]);

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const sendMsg = () => {
        if (msg.trim()) {
            const data = {
                userToSend: name,
                Sender: userToken,
                msg: msg
            };
            socket.emit('sendMsg', data);

            // Add message with timestamp to state
            setMessages((prevMessages) => [
                ...prevMessages,
                { msg: msg, Sender: userToken, time: formatTime(new Date()) }
            ]);
            setMsg(''); // Clear input
        }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
            <Toaster />
            <div className="px-4 py-2 bg-green-600 text-white font-semibold text-lg">{name}</div>
            <div className="flex-grow py-4 px-2 overflow-y-auto space-y-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`py-1 pl-3 pr-2 rounded-md shadow-sm w-fit flex justify-between ${message.Sender === userToken
                            ? 'ml-auto bg-green-500 text-white'
                            : 'mr-auto bg-gray-100 text-gray-800'
                            }`}
                    >
                        <div>{message.msg || "Error: Message content not available"}</div>
                        <div className={`text-xs self-end ml-3 ${message.Sender === userToken ? 'text-white' : 'text-black'}`}>
                            {message.time}
                        </div>
                    </div>
                ))}
            </div>
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
