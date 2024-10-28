import React, { useState } from 'react';
import Cookies from 'js-cookie';
import AddUserCard from './addUserCard.js';

const Search = () => {
    const [name, setName] = useState('');
    const [userContact, setUserContact] = useState(null);
    const [error, setError] = useState('');
    const [showAddUserCard, setShowAddUserCard] = useState(false); // State to toggle AddUserCard visibility

    const getName = (e) => {
        setName(e.target.value);
    };

    const searchUser = async () => {
        try {
            const res = await fetch('http://localhost:4000/user/getUser', {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    username: Cookies.get('token')
                })
            });

            const data = await res.json();

            if (res.status === 200) {
                setUserContact(data);
                setName('');
                setError('');
                setShowAddUserCard(true); // Show AddUserCard on successful search
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('Failed to fetch user');
        }
    };

    const toggleAddUserCard = () => {
        setShowAddUserCard(!showAddUserCard); // Toggle visibility
    };

    return (
        <div className="flex flex-col mb-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={getName}
                    value={name}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                />
                <button
                    onClick={searchUser}
                    className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Search
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {/* Button to toggle AddUserCard */}
            {userContact && (
                <div className="mt-2">
                    <button
                        onClick={toggleAddUserCard}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {showAddUserCard ? 'Hide User Card' : 'Show User Card'}
                    </button>
                    {showAddUserCard && (
                        <AddUserCard data={userContact} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
