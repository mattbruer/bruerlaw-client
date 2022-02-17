import { useReducer, useState } from 'react';
import styles from '../styles/SignupComponent.module.css';
import Link from 'next/link';
import { authenticate, signIn, isAuth } from '../API/auth';

import { useRouter } from 'next/router';

const SignInComponent = ({ setHasAccount }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    signIn(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push('/admin');
          } else if (isAuth() && isAuth().role === 0) {
            router.push('/user');
          }
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      {/* <h1>Sign In</h1> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit" className={styles.btn}>
            Sign In
          </button>
        </div>
      </form>
      <div className={styles.links}>
        <Link href="/register">
          <a>Don{"'"}t have an acount? Register here.</a>
        </Link>
      </div>
    </div>
  );
};

export default SignInComponent;
