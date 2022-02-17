import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import slide from '../../public/images/slide.jpg';

const Page = () => {
  const [source, setSource] = useState(slide);
  const router = useRouter();
  const { name } = router.query;
  return (
    <div style={{ border: '1px solid black' }}>
      {source ? (
        <Image layout="responsive" src={source} alt="none" />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vw',
            width: '100%',
          }}
        >
          Choose Banner Image
        </div>
      )}
    </div>
  );
};

export default Page;
