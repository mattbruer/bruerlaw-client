import React from 'react';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import slide from '../public/images/slide.jpg';
import headshot2 from '../public/images/headshot2.jpg';
import Typewriter from 'typewriter-effect';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useSocket } from '../helpers/SocketWrapper';

const HomePage = () => {
  const router = useRouter();
  const sock = useSocket();
  useEffect(() => {
    sock &&
      sock.on('connect', () => {
        sock.emit(router.pathname);
      });

    return () => {
      sock && sock.emit(`leave-${router.pathname}`);
    };
  }, [sock, router.pathname]);
  return (
    <div className="homepage">
      <Head>
        <title>Bruer Law Firm</title>
        <meta name="description" content={'law'} />
      </Head>
      <Layout>
        <main className="main">
          <div className="slide-container">
            <div className="text-box">
              <Typewriter
                options={{
                  strings: "We're here to help!",
                  autoStart: true,
                  loop: false,
                }}
              />
            </div>
            <Image
              alt="a beautiful stain glass window with the scales of justice in the center"
              height="486"
              width="1524"
              src={slide}
            />
          </div>

          <div
            style={{ backgroundColor: 'white' }}
            className="welcome-container"
          >
            <div className="headshot-container">
              <div>
                <Image
                  alt="Rob's headshot"
                  height="819"
                  width="586"
                  layout="responsive"
                  src={headshot2}
                />
              </div>
            </div>
            <div className="welcome-text-container">
              <h1 style={{ textAlign: 'center' }}>
                {' '}
                Welcome To The Bruer Law Firm.
              </h1>
              <p>
                With over twenty-five years of experience, located in and near
                the Kansas City Metropolitan area and Lawrence, Kansas, we are
                dedicated to helping people, families, and businesses who have
                been harmed, in matters involving automobile collisions,
                personal injury, negligence, wrongful death, malpractice,
                dangerous property, defective products, insurance disputes,
                fraud, breach of contract, and civil rights violations.
              </p>
              <h2 style={{ textAlign: 'center' }}>
                {' '}
                ​All initial consultations are free.
              </h2>
            </div>
          </div>

          <div className="welcome-container">
            <div
              style={{
                height: '400px',
                width: '50%',
                backgroundColor: 'lightblue',
              }}
            ></div>
            <div
              style={{
                height: '400px',
                width: '50%',
                backgroundColor: 'lightpink',
              }}
            ></div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default HomePage;
