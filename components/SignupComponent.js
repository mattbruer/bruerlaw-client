import React, { useState, useEffect } from 'react';
import styles from '../styles/SignupComponent.module.css';
import Link from 'next/link';
import { createAccount, sendConfirmEmail } from '../API/auth';
import { useRouter } from 'next/router';

const SignupComponent = ({ setHasAccount }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    message: false,
    error: false,
  });

  const { name, email, password, message, error } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem('emailForSignIn', email);
    sendConfirmEmail(name, email).then((data) => {
      router.push('/complete-registration/check-email');
    });

    // createAccount({ name, email, password }).then((data) => {
    //   if (data.error) {
    //     console.log(data.errors);
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     setValues({ ...values, message: data.message });
    //   }
    // });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            name="name"
            onChange={handleChange}
            className={error.name ? styles.error : styles.input}
            type="text"
            placeholder="name"
            value={name}
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className={error.email ? styles.error : styles.input}
            placeholder="email"
            value={email}
          />
          {/* <input
            type="password"
            name="password"
            onChange={handleChange}
            className={error.password ? styles.error : styles.input}
            placeholder="password"
            value={password}
          /> */}

          <button className={styles.btn} type="submit">
            Create Account
          </button>
          {message && <p> {message}</p>}
          <div className={styles.errorContainer}>
            {error.name && <p>{error.name}</p>}
            {error.email && <p>{error.email}</p>}
          </div>
        </div>
      </form>
      <div className={styles.links}>
        <Link href="/sign-in">
          <a>Already have an acount? Sign In.</a>
        </Link>
      </div>
    </div>
  );
};

export default SignupComponent;
