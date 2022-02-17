import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import phone from '../public/images/contact.jpg';
import { handleSockets, useSocket } from '../helpers/SocketWrapper';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import { sendMessage } from '../API/contactForm';

const Contact = ({}) => {
  const router = useRouter();
  const sock = useSocket();
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const cleanup = handleSockets(sock, router);

    return () => {
      sock && sock.emit(`leave-${router.pathname}`);
      cleanup;
    };
  }, [sock, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //replace random string with email for socketUser...NEED TO UPDATE DB TO SWITCH NAMES
    // localStorage.setItem('userForSocket', values.email);
    sendMessage(values).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      sock.emit('newContactFormMessage');
      alert('Your message has been sent.  Thank you for contacting us.');
      router.push('/');
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(#123,black)',
        height: '100%',
      }}
    >
      <Banner image={phone} bannerText="Contact Rob" typeWriter />
      <ToastContainer />
      <div
        style={{
          display: 'flex',
          height: '100px',
          justifyContent: 'space-around',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        <div style={styles.phoneBox}>
          <a style={styles.phoneNum} href="tel:8163828775">
            816-382-8775 Kansas City, MO
          </a>
        </div>

        <div style={styles.phoneBox}>
          <a style={styles.phoneNum} href="tel:8163828775">
            816-382-8775 Lawrence, KS
          </a>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.labels} htmlFor="name">
            Name:
          </label>
          <input
            onChange={handleChange}
            style={styles.inputs}
            name="name"
            placeholder=""
          />
          <label style={styles.labels} htmlFor="email">
            email:
          </label>
          <input
            onChange={handleChange}
            required
            style={styles.inputs}
            name="email"
            placeholder="*required for reply"
          />
          <label style={styles.labels} htmlFor="email">
            Your Message:
          </label>
          <textarea
            name="message"
            onChange={handleChange}
            required
            placeholder="type..."
            style={styles.textarea}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Header />
    </div>
  );
};

export default Contact;

const styles = {
  labels: {
    color: 'white',
    width: '200px',
  },
  inputs: {
    width: '200px',
    marginBottom: '20px',
    height: '32px',
    fontSize: '16px',
  },
  textarea: {
    height: '300px',
    marginTop: '20px',
    borderRadius: '10px',
    fontSize: '16px',
  },
  form: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginBottom: '150px',
  },
  phoneBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px double #333',
    borderRadius: '10px',
    width: '180px',
    textAlign: 'center',
    backgroundColor: '#222',
    boxShadow: '10px 5px 5px black',
  },
  phoneNum: { color: 'white', fontSize: '1.5rem' },
  button: {
    marginTop: '20px',

    height: '44px',
    width: '88px',
  },
};
