import React from 'react';
import books from '../public/images/books.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Netflix = ({ items }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '250px',
        width: '100%',
        backgroundColor: '#456',
        overflowX: 'scroll',
      }}
    >
      {items.map((item, i) => {
        return (
          <div
            style={{
              minWidth: '250px',
              maxWidth: '250px',
              color: 'black',
              backgroundColor: 'lightgrey',
              margin: '5px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
            key={i}
          >
            <Image alt="old books" src={books} />
            <Link href={`/blogs/${item.slug}`} passHref>
              <a>{item.name || item.title}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Netflix;
