import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

// const socket = io("http://localhost:4000", {
//   withCredentials: true
// });
function App() {
  const [msg, setMsg] = useState('')
  // useEffect(() => {
  //   // Listen for messages from the server (relayed from another client)
  //   socket.on('connection', (data) => {
  //     setMsg(data)
  //   });
  //   const userObj = {
  //     userName: "User1"
  //   }
  //   socket.emit('sendconnection', userObj);

  //   // Cleanup event listeners when component unmounts
  //   return () => {
  //     // socket.disconnect()
  //   };
  // }, []);
  return (
    <div className="App">
      <h1>{msg}</h1>
    </div>
  );
}

export default App;
