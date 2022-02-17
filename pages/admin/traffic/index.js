import React, { useState, useEffect } from 'react';
import { useSocket, handleSockets } from '../../../helpers/SocketWrapper';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVisitorLog, newVisitor } from '../../../API/visitors';
import PieChart from '../../../components/PieChart';
import Header from '../../../components/Header';
import Image from 'next/image';
import anon from '../../../public/images/anon.png';

const Index = () => {
  const router = useRouter();
  const sock = useSocket();
  const [visitors, setVisitors] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [hydrate, setHydrate] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    msg && toast(msg, { autoClose: 2000 });
    setMsg('');
    loadVisitors(sock);
  }, [hydrate, msg, sock]);

  useEffect(() => {
    const cleanup = handleSockets(
      sock,
      router,
      setHydrate,
      setMsg,
      setOnlineUsers
    );

    return cleanup;
  }, [sock, router]);

  const loadVisitors = () => {
    getVisitorLog().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setVisitors((prev) => data.visitors);
        // sock &&
        //   sock.on('hi', ({ email }) => {
        //     if (data.visitors.filter((v) => v.email === email).length === 0) {
        //       newVisitor(email).then(() => {
        //         loadVisitors(sock);
        //       });
        //     }
        //   });
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          // color: 'white',
          textAlign: 'center',
        }}
      >
        <div>{JSON.stringify(onlineUsers)}</div>
        <h1 style={{ color: 'white' }}>Total Unique Visitors*</h1>
        <h2 style={{ color: 'white' }}>{visitors.length - 1}</h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              border: '1px solid grey',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2 style={{ color: 'white' }}>First Impressions:</h2>
            <p style={{ color: 'white' }}>Page landed on for first visit</p>
            <PieChart visitors={visitors} firstImpressions />
          </div>
          <div style={{ border: '1px solid grey', width: '100%' }}>
            <h2 style={{ color: 'white' }}>Page Popularity:</h2>
            <p style={{ color: 'white' }}>
              Total times each page has been viewed
            </p>
            <PieChart visitors={visitors} popularPage />
          </div>
        </div>
        <Header />
      </div>
    </>
  );
};

export default Index;
