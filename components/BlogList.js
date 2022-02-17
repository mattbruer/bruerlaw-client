import React, { useState, useEffect } from 'react';
import { listBlogs } from '../API/blog';
import { isAuth } from '../API/auth';
import books from '../public/images/books.jpg';
import Image from 'next/image';
import Link from 'next/link';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    listBlogs().then((data) => {
      if (data.error) {
        return console.log(data.error);
      }

      setBlogs(data);
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '250px',
        width: '100%',
        backgroundColor: '#123',
        overflowX: 'scroll',
      }}
    >
      {blogs
        .map((b, i) => {
          return (
            <Link key={i} href={`/admin/crud/${b.slug}`} passHref>
              <div
                style={{
                  minWidth: '250px',
                  border: '1px solid black',
                  backgroundColor: '#789',
                  margin: '5px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <Image alt="books" layout="responsive" src={books} />
                <p>{b.title}</p>
              </div>
            </Link>
          );
        })
        .reverse()}
    </div>
  );
};

export default BlogList;
