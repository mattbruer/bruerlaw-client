import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Banner.module.css';
import Typewriter from 'typewriter-effect';
import { SocketContext } from '../Socket/socketContext';

const Banner = ({ image, imageAlt, bannerText, typeWriter, declined }) => {
  const height = useState(60);
  const img = useRef();

  console.log(imageAlt);
  return (
    <div
      style={{
        position: 'relative',
        height: `${height}vw`,
        width: '100%',
      }}
    >
      {typeWriter ? (
        <div className={styles.textBox}>
          {' '}
          <Typewriter
            options={{
              strings: `${bannerText}`,
              autoStart: true,
              loop: false,
            }}
          />
        </div>
      ) : (
        <div
          className={styles.textBox}
          style={{ fontSize: '20px', color: 'red' }}
        >
          <p>{bannerText}</p>
        </div>
      )}

      <div ref={img}>
        {declined ? (
          <Image
            height={200}
            width={200}
            layout="responsive"
            alt={imageAlt}
            src={image}
            // priority
          />
        ) : (
          <Image
            layout="responsive"
            alt={imageAlt}
            src={image}
            // priority
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
