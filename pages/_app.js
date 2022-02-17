import '../styles/globals.css';

import Head from 'next/head';
import SocketWrapper from '../helpers/SocketWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <SocketWrapper>
      <Head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=5" />
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Personal Injury Lawyer in Lawrence, Kansas and Kansas City, Missouri"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}

        <title>Bruer Law Firm</title>
      </Head>

      <Component {...pageProps} />
    </SocketWrapper>
  );
}

export default MyApp;
