import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Header />
    </>
  );
};

export default Layout;
