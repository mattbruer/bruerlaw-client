import { useState } from 'react';
import Layout from '../components/Layout';
import SignupComponent from '../components/SignupComponent';
import SignInComponent from '../components/SignInComponent.js';
import Link from 'next/link';

const Signup = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div>
      <Layout>
        <SignupComponent setHasAccount={setHasAccount} />
      </Layout>
    </div>
  );
};

export default Signup;
