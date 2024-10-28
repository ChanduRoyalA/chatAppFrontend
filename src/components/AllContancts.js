import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import Chat from './Chat';
import Search from './Search';

const AllContacts = (props) => {
    const { socket } = props
    const [contact, setContacts] = useState([]);
    const [UserToChat, setUserToChat] = useState('')
    const user = Cookies.get('token');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('http://localhost:4000/user/getUser', {
                    method: "POST",
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        name: user
                    })
                });
                const data = await res.json();
                setContacts(data.contacts); // update state with fetched contacts
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, [user]); // add 'user' as dependency if it can change

    const triggerChat = (e) => {
        setUserToChat(e.target.value)
    }

    return (
        <div className="bg-green-100 min-h-screen grid grid-cols-4">
            {/* Sidebar for Contacts */}
            <div className="col-span-1 p-6 bg-white border-r border-gray-200 shadow-lg">
                <Search />
                {contact && (
                    <ul className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                        {contact.map(c => (
                            <li key={c}>
                                <button
                                    onClick={triggerChat}
                                    value={c}
                                    className="w-full text-left px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    {c}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Chat Area */}
            <div className="col-span-3 bg-green-50 p-6 flex flex-col">
                {UserToChat ? (
                    <div className="flex flex-col h-full ">
                        {/* <div className="px-4 py-2 bg-green-600 text-white font-semibold rounded-t-lg">
                            Chat with {UserToChat}
                        </div> */}
                        <div className="flex-grow p-4 overflow-y-auto">
                            <Chat name={UserToChat} socket={socket} />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a contact to start chatting
                    </div>
                )}
            </div>
        </div>

    );
}

export default AllContacts;
