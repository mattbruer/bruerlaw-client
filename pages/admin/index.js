import React, { useState, useEffect } from 'react';
import { getMessages } from '../../API/contactForm';

import Link from 'next/link';
import Header from '../../components/Header';
import { updateReadStatus } from '../../API/contactForm';

const Admin = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setMessages(data.messages);
    });
  }, []);

  return (
    <div
      style={{
        color: 'white',
        height: '1000px',
        margin: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        // justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: '60px' }}>Welcome Rob!</h1>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '20px',
        }}
      >
        <Link href="/admin/blfp">
          <a style={{ color: 'white' }}>Manage Bruer Law Firm Publications</a>
        </Link>

        <Link href="/admin/cases">
          <a style={{ color: 'white' }}>Manage Your Cases</a>
        </Link>

        <Link href="/admin/traffic">
          <a style={{ color: 'white' }}>Page traffic</a>
        </Link>
      </div>

      <p>CONTACT FORM MESSAGES :</p>
      <div style={styles.contactFormMessageBox}>
        {messages
          .map((m, i) => {
            return (
              <>
                <Link key={i} href={`/admin/contact-form/${m._id}`}>
                  <a
                    onClick={() => {
                      updateReadStatus(m._id);
                    }}
                    style={
                      m.read
                        ? styles.incoming
                        : {
                            ...styles.incoming,
                            fontWeight: 'bold',
                            color: 'black',
                          }
                    }
                  >
                    {`${m.name || 'NO NAME PROVIDED'}  -  ${
                      m.email
                    } - ${new Date(m.createdAt).toDateString()} `}
                  </a>
                </Link>
              </>
            );
          })
          .reverse()}
      </div>
      <Header />
    </div>
  );
};

export default Admin;

const styles = {
  contactFormMessageBox: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    minHeight: '200px',
    marginLeft: '5%',
    padding: '5px',
    overflowY: 'scroll',
    borderRadius: '5px',
  },
  incoming: {
    color: 'grey',
    marginBottom: '15px',
    fontSize: '16px',
    borderBottom: '1px solid grey',
    padding: '5px',
  },
};
