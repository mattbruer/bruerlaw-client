import React, { useState, useEffect } from 'react';
import { getSingleBlog, listBlogs } from '../../API/blog';
import renderHtml from 'react-render-html';
import Banner from '../../components/Banner';
import books from '../../public/images/bruerpub.jpg';
import { useSocket } from '../../helpers/SocketWrapper';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import Head from 'next/head';

import { isAuth } from '../../API/auth';

const Blog = ({ blog, slug }) => {
  const router = useRouter();

  useEffect(() => {
    if (isAuth()) {
      localStorage.setItem('userForSocket', isAuth().email);
    }
    if (!localStorage.getItem('userForSocket')) {
      localStorage.setItem('userForSocket', nanoid());
    }

    const api = 'http://[localhost]:';
    const port = 8000;

    const sock = io(
      `${api}${port}?nid=${encodeURIComponent(
        localStorage.getItem('userForSocket')
      )}&page=${slug}`
    );
    sock &&
      sock.on('connect', () => {
        sock.emit(slug);
      });

    return () => {
      sock && sock.emit(`leave-${slug}`);
      sock.disconnect();
    };
  }, [slug]);

  return (
    <div style={{ minHeight: '1000px', backgroundColor: 'white' }}>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.body} />
        {/* <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" /> */}
        {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
      </Head>
      <Banner
        image={books}
        bannerText={`${blog.title}`}
        typeWriter
        imageAlt="photo of books"
      />
      <div style={{ margin: '15px' }}>{renderHtml(blog.body)}</div>
    </div>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  let posts = await listBlogs();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
export function getStaticProps({ params }) {
  const slug = params.slug;

  return getSingleBlog(slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return {
      props: { blog: data, slug }, // will be passed to the page component as props
    };
  });
}

export default Blog;
