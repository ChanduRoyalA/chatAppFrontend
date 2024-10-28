import React, { useState } from 'react'
import Cookies from 'js-cookie';

const AddUserCard = (props) => {
    const [isFlag, setisFlag] = useState()
    const { data } = props
    const { name, id } = data
    const addUser = async () => {
        const res = await fetch('http://localhost:4000/user/addUserToContact', {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify({
                name: name,
                username: Cookies.get('token')
            })
        })
        if (res.status == 200) {
            //toast success
            setisFlag(true)
            alert('done')
        }
    }
    const removeUser = async () => {
        const res = await fetch('http://localhost:4000/user/addUserToContact', {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify({
                name: name,
                username: Cookies.get('token')
            })
        })
        if (res.status == 200) {
            //toast success
            setisFlag(false)
        }
    }
    return (
        // <div>
        //     <h1>{name}</h1>
        //     {
        //         !isFlag ? <button onClick={addUser}>+</button> : <button onClick={removeUser}>-</button>
        //     }
        // </div>
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
            <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
            <button
                onClick={isFlag ? removeUser : addUser}
                className={`px-4 py-2 rounded-full text-white transition duration-200 ${isFlag ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {isFlag ? '-' : '+'}
            </button>
        </div>
    )
}

export default AddUserCard
