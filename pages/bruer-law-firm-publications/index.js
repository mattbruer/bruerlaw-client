import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import books from '../../public/images/bruerpub.jpg';

import Banner from '../../components/Banner';
import { listBlogs } from '../../API/blog';
import { listCategories } from '../../API/blog';
import Netflix from '../../components/Netflix';
import { useRouter } from 'next/router';
import { useSocket } from '../../helpers/SocketWrapper';

const BLFP = ({ blogs }) => {
  console.log(blogs);
  // const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const sock = useSocket();

  useEffect(() => {
    // loadBlogs();
    loadCategories();
  }, []);

  useEffect(() => {
    sock &&
      sock.on('connect', () => {
        sock.emit(router.pathname);
      });

    return () => {
      sock && sock.emit(`leave-${router.pathname}`);
    };
  }, [sock, router.pathname]);

  // const loadBlogs = () => {
  //   listBlogs().then((data) => {
  //     if (data.error) {
  //       return console.log(data.error);
  //     }
  //     setBlogs(data);
  //   });
  // };

  const loadCategories = () => {
    listCategories().then((data) => {
      if (data.error) {
        return console.log(data.error);
      }
      setCategories(data);
    });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#123',
          color: 'white',
        }}
      >
        <Banner
          image={books}
          bannerText={'Bruer Law Firm Publications'}
          typeWriter
          imageAlt="books"
        />

        <div style={{ marginBottom: '90px' }}>
          {/* <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>Categories</h2>
          <Netflix items={categories} /> */}
          {categories.map((c, i) => {
            return (
              <div key={i}>
                <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>
                  {c.name}
                </h2>
                <Netflix
                  items={blogs.filter((b) => {
                    return b.categories.includes(c._id);
                  })}
                />
              </div>
            );
          })}

          <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>
            All Posts by Rob
          </h2>
          <Netflix items={blogs} />
        </div>
        <Header />
      </div>
    </>
  );
};

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts

//   let posts = await listBlogs();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }
export function getStaticProps({ params }) {
  return listBlogs().then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return {
      props: { blogs: data }, // will be passed to the page component as props
    };
  });
}
export default BLFP;
