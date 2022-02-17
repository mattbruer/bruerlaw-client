import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleMessage } from '../../../API/contactForm';

const Message = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const { id } = router.query;

  useEffect(() => {
    getSingleMessage(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setMessage(data);
    });
  }, [id]);

  return (
    <>
      {message && (
        <div style={styles.message}>
          <p>From: {message.email}</p>
          <p> -{new Date(message.createdAt).toDateString()}</p>
          <p>-{new Date(message.createdAt).toTimeString()}</p>
          <hr />
          <p>{message.message}</p>
          <button>
            <a
              rel="noreferrer"
              target="_blank"
              href={`mailto:${message.email}`}
            >
              Reply
            </a>
          </button>
        </div>
      )}
    </>
  );
};

export default Message;

const styles = {
  message: {
    color: 'white',
    margin: '20px',
  },
};
