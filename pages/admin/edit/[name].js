import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <p>edit banner image</p>
      <p>edit banner text</p>
      <hr />
      <p>edit welcome photo</p>
      <p> image alt text</p>
      <p> image size for nextjs Image component</p>
      <p>edit welcome text</p>
      <hr />
      <p>edit nav links for home page</p>
    </div>
  );
};

export default Page;
