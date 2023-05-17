import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'

const FriendListDetail = () => {
  const [friendList, setFriendList] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      fetch(`/api/friendlists/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => response.json())
        .then(data => setFriendList(data))
        .catch(error => console.log(error));
    }
  }, [id]);

  if (!friendList) {
    return <p>Loading friend list...</p>;
  }

  return (
    <div>
      <h2>Friend List Details</h2>
      <h3>{friendList.user.username}</h3>
      <ul>
        {friendList.friends.map(friend => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendListDetail;
// 2hours