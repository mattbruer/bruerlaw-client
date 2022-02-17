import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createAccount } from '../../API/auth';

const CompleteRegistration = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));

    setUsername(router.query.username);
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(email, username, password);
  };

  return (
    <div>
      <h2>Set your password</h2>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
