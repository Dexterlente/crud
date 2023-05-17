import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [notification, setNotification] = useState('');

  const sendMessage = () => {
    const token = Cookies.get('token');
    
    axios.post('/api/chat/', { message }, { headers: { Authorization: `Token ${token}` } })
      .then(response => console.log('Message sent!'))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/room1/');

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setReceivedMessages(prevMessages => [...prevMessages, data.message]);
      } else if (data.notification) {
        setNotification(data.notification);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      {notification && <p>{notification}</p>}
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
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
