import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import Image from 'next/image';
import MrBlue from '../../../public/images/MrBlue.png';
import slide from '../../../public/images/slide1.jpg';
import MrsPink from '../../../public/images/Mrs_Pink.png';
import anon from '../../../public/images/anon.png';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { listInvestigations } from '../../../API/investigation';
import CaseCard from '../../../components/CaseCard';
import { getAllCases } from '../../../API/cases';
import { API } from '../../../config';
import Header from '../../../components/Header';

const Clients = () => {
  const [investigations, setInvestigations] = useState([]);
  const [acceptedCases, setAcceptedCases] = useState([]);
  useEffect(() => {
    listInvestigations().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setInvestigations(data);
    });
    getAllCases().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setAcceptedCases(data);
    });
  }, []);
  return (
    <div style={{ marginBottom: '150px' }}>
      <Banner image={slide} bannerText="Bruer Law Cases" typeWriter />

      <h1 style={{ color: 'white', textAlign: 'center' }}>Accepted Cases</h1>

      <div
        style={{
          display: 'flex',
          height: '325px',
          // backgroundColor: 'white',
          overflowX: 'scroll',
        }}
      >
        {acceptedCases.map((ac, i) => {
          return <CaseCard key={i} acceptedCase={ac} />;
        })}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white' }}>Cases in Investigation</h1>
        <input
          style={{
            height: '40px',
            borderRadius: '20px',
            padding: '5px',
            marginBottom: '20px',
          }}
          placeholder="search..."
        />
      </div>

      <div
        style={{
          display: 'flex',
          height: '275px',

          overflowX: 'scroll',
        }}
      >
        {investigations
          .filter((investigation) => investigation.accepted !== true)
          .map((investigation, i) => {
            return (
              <Link
                key={i}
                href={`/admin/cases/investigations/${investigation.slug}`}
                passHref
              >
                <div
                  style={{
                    cursor: 'pointer',
                    minWidth: '250px',
                    border: '3px solid black',
                    height: '250px',
                    padding: '10px',
                    border: '1px solid white',
                    borderRadius: '10px',
                    backgroundImage: 'linear-gradient(#555, #815)',
                  }}
                >
                  {investigation.declined ? (
                    <Banner
                      image={`${API}/photo/${investigation.slug}`}
                      bannerText={'DECLINED'}
                      declined
                    />
                  ) : (
                    <Image
                      height={200}
                      width={200}
                      layout="responsive"
                      src={`${API}/photo/${investigation.photo}`}
                      alt="client headshot"
                    />
                  )}

                  <h3 style={{ color: 'white', margin: '5px' }}>
                    <p>{investigation.plaintiff} </p>
                  </h3>
                </div>
              </Link>
            );
          })}
      </div>

      <div style={{ height: '250px', color: 'white', marginTop: '20px' }}>
        <Link href={`/admin/cases/new-investigation`} passHref>
          <div
            style={{
              textAlign: 'center',
              border: '1px solid white',
              width: '250px',
              height: '100%',
              backgroundColor: '#456',
              borderRadius: '10px',
            }}
          >
            <h2>New Investigation</h2>

            <FaPlus size="10rem" />
          </div>
        </Link>
      </div>
      <Header />
    </div>
  );
};

export default Clients;
