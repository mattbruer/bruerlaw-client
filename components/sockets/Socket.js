import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Socket = () => {
  const [socket, setSocket] = useState(null);
  const [sharedState, setSharedState] = useState({});
  useEffect(() => {
    const socketIo = io(`http://localhost:8000`);

    socketIo.on('connect', () => {
      const prevUser = localStorage.getItem('socket');
      console.log(socketIo.id);
      if (prevUser) {
        console.log('previous user', prevUser);
        //this user has been here before
      } else {
        localStorage.setItem('socket', socketIo.id);
      }
    });

    socketIo.on('now', (m) => console.log(m));
    setSocket(socketIo);

    setSharedState(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, []);
  return <div></div>;
};

export default Socket;
