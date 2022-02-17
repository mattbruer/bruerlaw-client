import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/logo.jpg';
import { isAuth } from '../API/auth';
import phone from '../public/images/contact.jpg';
import { useEffect } from 'react/cjs/react.development';

let renderLinks;
const Header = ({ navlinks }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuth());
  }, []);

  if (navlinks) {
    renderLinks = () => {
      return navlinks.map((l, i) => {
        return (
          <Link key={i} href={`${l.url}`}>
            <a>{`${l.anchorText}`}</a>
          </Link>
        );
      });
    };
  }
  return (
    <div className="header">
      <Link href="/">
        <a className="home-icon">
          <Image
            alt="a beautiful stain glass window with the scales of justice in the center"
            height="452"
            width="408"
            src={logo}
            layout="responsive"
          />
        </a>
      </Link>
      {auth ? (
        auth.role === 1 ? (
          <Link href="/admin">
            <a>{`${auth.name.split(' ')[0]}'s Dashboard `}</a>
          </Link>
        ) : (
          <Link href="/user">
            <a>{`${auth.name.split(' ')[0]}'s Dashboard `}</a>
          </Link>
        )
      ) : (
        <Link href="/sign-in">
          <a>Sign In</a>
        </Link>
      )}

      {navlinks ? (
        renderLinks()
      ) : (
        <>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/bruer-law-firm-publications">
            <a>Read</a>
          </Link>
          <Link href="/expertise">
            <a>Expertise</a>
          </Link>
          <Link href="/contact" passHref>
            <div
              style={{
                height: '70px',
                width: '100px',
                mixBlendMode: 'darken',
                cursor: 'pointer',
              }}
            >
              <Image width="3481" height="2352" alt="phone" src={phone} />
            </div>

            {/* <a>Contact</a> */}
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
