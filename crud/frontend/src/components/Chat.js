import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const sendMessage = () => {
    axios.post('/api/chat/', { message })
      .then(response => console.log('Message sent!'))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/room1/');

    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      setReceivedMessages(prevMessages => [...prevMessages, message]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
