import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogList from '../../../components/BlogList';
import CategoriesList from '../../../components/CategoriesList';
import Banner from '../../../components/Banner';
import books from '../../../public/images/bruerpub.jpg';
import Header from '../../../components/Header';

const index = () => {
  return (
    <div>
      <Banner
        image={books}
        bannerText="Bruer Law Firm Publications"
        typeWriter
        imageAlt="photo of books"
      />
      <hr />
      <h2 style={{ color: 'white', textAlign: 'center' }}>
        Edit Your Publications
      </h2>
      <div style={{ marginBottom: '75px' }}>
        <BlogList />
      </div>

      <hr />
      {/* <h2 style={{ textAlign: 'center' }}>Categories</h2>
      <CategoriesList />
      <hr /> */}

      <Header
        navlinks={[{ url: '/admin/crud/blog', anchorText: 'Write a new post' }]}
      />
    </div>
  );
};

export default index;
