// import { createContext, useContext, useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext();

// export function SocketWrapper({ children }) {
//   const [socket, setSocket] = useState(null);
//   const [sharedState, setSharedState] = useState({});
//   useEffect(() => {
//     const socketIo = io(`http://localhost:8000`);

//     socketIo.on('connect', () => {
//       const prevUser = localStorage.getItem('socket');
//       console.log(socketIo.id);
//       if (prevUser) {
//         console.log('previous user', prevUser);
//         //this user has been here before
//       } else {
//         localStorage.setItem('socket', socketIo.id);
//       }
//     });

//     socketIo.on('now', (m) => console.log(m));
//     setSocket(socketIo);

//     setSharedState(socketIo);

//     function cleanup() {
//       alert('bye');
//       socketIo.disconnect();
//     }

//     return cleanup;
//   }, []);

//   return (
//     <SocketContext.Provider value={sharedState}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// export function useSocketContext() {
//   return useContext(SocketContext);
// }
