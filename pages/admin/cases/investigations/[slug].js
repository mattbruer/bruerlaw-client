import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import anon from '../../../../public/images/anon.png';
import PhotoUpload from '../../../../components/PhotoUpload';
import {
  getSingleInvestigation,
  updateInvestigation,
  acceptCase,
} from '../../../../API/investigation';
import { API } from '../../../../config';

const Investigation = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [investigation, setInvestigation] = useState(null);
  const [body, setBody] = useState('');

  useEffect(() => {
    getSingleInvestigation(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      }

      setInvestigation(data[0]);
    });
  }, [slug]);

  useEffect(() => {
    investigation && setBody(investigation.notes);
  }, [investigation]);

  const handleChange = (e) => {
    e.preventDefault();
    setBody((prev) => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInvestigation(investigation._id, { notes: body }).then((data) => {
      alert('Investigation notes have been updated');
    });
  };

  return (
    <div style={{ color: 'white' }}>
      {investigation && (
        <>
          <div
            style={{
              display: 'flex',
              margin: '15px',
              width: '300px',
            }}
          >
            <PhotoUpload
              investigationId={investigation._id}
              defaultPhoto={
                <Image
                  layout="responsive"
                  width={'200px'}
                  height={'200px'}
                  src={`${API}/photo/${investigation.photo}`}
                  alt={`${investigation.plaintiff}`}
                />
              }
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {investigation.declined && (
                <h2 style={{ color: 'red' }}>DECLINED</h2>
              )}
              <h2>{investigation.plaintiff}</h2>
              <h2>
                <a
                  style={{ color: 'white', fontSize: '1.5rem' }}
                  href={`tel:${investigation.phone}`}
                >
                  {investigation.phone}
                </a>
              </h2>
              <h2>
                <a
                  style={{ color: 'white', fontSize: '1.5rem' }}
                  href={`mailto:${investigation.email}`}
                >
                  {investigation.email}
                </a>
              </h2>
            </div>
          </div>
          <div>
            <div>
              <h2>Initial Intake Notes</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={body}
                  onChange={handleChange}
                  style={{ margin: '20px', width: '90%', height: '500px' }}
                />
                <button type="submit">Update notes</button>
              </form>
            </div>
            <div>
              <h2>Accept Case?</h2>
              <button
                disabled={investigation.declined}
                onClick={() => {
                  updateInvestigation(investigation._id, {
                    declined: false,
                    accepted: true,
                  }).then((data) => {
                    if (data.error) {
                      console.log(data.error);
                    }

                    acceptCase(investigation).then((data) => {
                      alert('Case Accepted');
                      router.push('/admin/cases');
                    });
                  });
                }}
              >
                Accept
              </button>
              {!investigation.declined && (
                <button
                  onClick={() => {
                    updateInvestigation(investigation._id, {
                      declined: true,
                    })
                      .then((data) => {
                        if (data.error) {
                          console.log(data.error);
                        }
                        alert('Case Declined');
                        router.push('/admin/cases');
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Decline
                </button>
              )}

              {investigation.declined && (
                <button
                  onClick={() => {
                    updateInvestigation(investigation._id, {
                      declined: false,
                    }).then((data) => {
                      if (data.error) {
                        console.log(data.error);
                      }
                      alert('Investigation reopened');
                      router.push('/admin/cases');
                    });
                  }}
                >
                  Reopen Investigation
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Investigation;
