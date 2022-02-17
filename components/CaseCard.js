import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anon from '../public/images/anon.png';
import { API } from '../config';

const CaseCard = ({ acceptedCase }) => {
  return (
    <div
      style={{
        width: '250px',
        border: '3px solid black',
        height: '100%',
        padding: '10px',

        borderRadius: '10px',
        backgroundImage: 'linear-gradient(#555, #815)',
      }}
    >
      <Image
        layout="responsive"
        width={200}
        height={200}
        src={`${API}/photo/${acceptedCase.photo}`}
        // src={anon}
        alt="mrblue"
      />
      <Link href={`/admin/cases/${acceptedCase.slug}`} passHref>
        <h3 style={{ color: 'white', cursor: 'pointer' }}>
          {acceptedCase.plaintiff} vs {acceptedCase.defendant}
        </h3>
      </Link>
    </div>
  );
};

export default CaseCard;
