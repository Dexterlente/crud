import React, { useState, useEffect } from 'react';

const FriendListDetail = ({ friendListId }) => {
  const [friendList, setFriendList] = useState(null);

  useEffect(() => {
    fetch(`/api/friendlists/${friendListId}/`)
      .then(response => response.json())
      .then(data => setFriendList(data))
      .catch(error => console.log(error));
  }, [friendListId]);

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
