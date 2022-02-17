import React from 'react';
import styles from '../../styles/EditYourPages.module.css';
import HomePage from '../../components/pages/HomePage';
import { DOMAIN } from '../../config';
import Link from 'next/link';

const EditYourPages = () => {
  return (
    <div className="">
      <p>Edit your pages</p>

      <div className={styles.container}>
        <Link href="/admin/edit/home" passHref>
          <a className={styles.pageCard}>
            <p>Home Page</p>
            <p>{`${DOMAIN}/`}</p>
          </a>
        </Link>
        <Link href="/admin/edit/about" passHref>
          <a className={styles.pageCard}>
            <p>About</p>
            <p>{`${DOMAIN}/about`}</p>
          </a>
        </Link>
        <div className={styles.pageCard}>
          <p>Expertise Page</p>
        </div>{' '}
        <div className={styles.pageCard}>
          <p>Read Page</p>
        </div>{' '}
        <div className={styles.pageCard}>
          <p>Contact Page</p>
        </div>
      </div>
    </div>
  );
};

export default EditYourPages;
