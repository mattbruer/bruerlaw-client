import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { isAuth } from '../API/auth';
import React, { useState, useEffect, createContext, useContext } from 'react';

const SocketContext = createContext();

const SocketWrapper = ({ children }) => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuth()) {
      localStorage.setItem('userForSocket', isAuth().email);
    }
    if (!localStorage.getItem('userForSocket')) {
      localStorage.setItem('userForSocket', nanoid());
    }

    const socketIo = io(
      `http://[localhost]:8000?nid=${encodeURIComponent(
        localStorage.getItem('userForSocket')
      )}&page=${router.pathname}`
    );

    setSocket((prev) => socketIo);

    function cleanup() {
      console.log('Socket wrapper cleanup ran');
      socketIo.disconnect();
    }

    return cleanup;
  }, [router]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketWrapper;

export function useSocket() {
  return useContext(SocketContext);
}

export function handleSockets(
  sock,
  router,
  setHydrate,
  setMsg,
  setOnlineUsers
) {
  sock &&
    sock.on('connect', () => {
      sock.emit(router.pathname);
    });

  sock &&
    sock.on('bye', (m) => {
      // sock.disconnect();
      console.log(m.msg);
    });

  sock &&
    sock.on('hi', (m) => {
      setMsg(m.msg);
      setOnlineUsers && setOnlineUsers(m.onlineUsers);
      setHydrate((prev) => !prev);
    });

  return () => {
    console.log('handle sockets cleanup ran');
    sock && sock.emit(`leave-${router.pathname}`);
  };
}
