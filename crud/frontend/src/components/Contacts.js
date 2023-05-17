import React, { useState, useEffect } from 'react';

const Contacts = () => {
  const [friendLists, setFriendLists] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      fetch('/api/friendlists/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => response.json())
        .then(data => setFriendLists(data))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div>
      <h1>Friend List</h1>
      {friendLists.map(friendList => (
        <div key={friendList.id}>
          <h3>{friendList.user.username}</h3>
          <ul>
            {friendList.friends.map(friend => (
              <li key={friend.id}>{friend.username}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
