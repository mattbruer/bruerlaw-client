import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { handleSockets } from '../../../helpers/SocketWrapper';
import { useSocket } from '../../../helpers/SocketWrapper';
import Image from 'next/image';
import anon from '../../../public/images/anon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCase } from '../../../API/cases';
import { API } from '../../../config';
import PhotoUpload from '../../../components/PhotoUpload';

const Case = () => {
  const [caseFile, setCaseFile] = useState(null);
  const router = useRouter();
  const sock = useSocket();

  useEffect(() => {
    getCase(router.query.name).then((data) => {
      if (data.error) {
        console.log(data.error);
      }

      setCaseFile(data[0]);
    });
  }, [router.query.name]);

  const thisClient = router.query.name;

  const [hydrate, setHydrate] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    msg && toast(msg, { autoClose: 2000 });
    setMsg('');
  }, [hydrate]);

  useEffect(() => {
    const cleanup = handleSockets(sock, router, setHydrate, setMsg);

    return cleanup;
  }, [sock, router]);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {caseFile && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h1>
                {caseFile.plaintiff} vs {caseFile.defendant}, et al.
              </h1>
              <div
                style={{
                  width: '100%',
                  // borderRadius: '30px',
                  overflow: 'hidden',

                  marginBottom: '45px',
                  display: 'flex',
                  flexDirection: 'row',

                  justifyContent: 'center',
                }}
              >
                <PhotoUpload
                  defaultPhoto={
                    <Image
                      layout="responsive"
                      width={200}
                      height={200}
                      alt="profile photo"
                      src={`${API}/photo/${caseFile.photo}`}
                    />
                  }
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <a
                    style={{ fontSize: '20px', color: 'white' }}
                    href={`mailto:${caseFile.email}`}
                  >
                    email:{caseFile.email}
                  </a>
                  <a
                    style={{ fontSize: '16px', color: 'white' }}
                    href={`tel:${caseFile.phone}`}
                  >
                    phone:{caseFile.phone}
                  </a>
                </div>

                {/* <Image
                  layout="responsive"
                  width={200}
                  height={200}
                  src={`${API}/photo/${caseFile.photo}`}
                  alt="mrblue"
                /> */}
              </div>
              {/* <input
                style={{ height: '30px', borderRadius: '20px', padding: '5px' }}
                placeholder=" search..."
              /> */}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',

                height: '100%',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ ...styles.folder, backgroundColor: '' }}>
                <p>Initial Intake Notes</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'purple' }}>
                <p>Correspondence</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'blue' }}>
                <p>Pleadings</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'purple' }}>
                <p>Motions</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'orange' }}>
                <p>Interrogatories</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'green' }}>
                <p>Requests for Production</p>
              </div>
              <div
                style={{
                  ...styles.folder,
                  backgroundColor: 'yellow',
                  color: 'black',
                }}
              >
                <p>Memos</p>
              </div>
              <div
                style={{
                  ...styles.folder,
                  backgroundColor: 'gold',
                  color: 'black',
                }}
              >
                <p>Notes</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'black' }}>
                <p>Investigation</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'green' }}>
                <p>Requests for Production</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'red' }}>
                <p>Medical</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'red' }}>
                <p>Expenses</p>
              </div>
              <div
                style={{
                  ...styles.folder,
                  backgroundColor: 'yellow',
                  color: 'black',
                }}
              >
                <p>Special Damages</p>
              </div>

              <div style={{ ...styles.folder, backgroundColor: 'black' }}>
                <p>Records Requests</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'green' }}>
                <p>Photos</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: 'blue' }}>
                <p>Witnesses</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: '' }}>
                <p>Misc.</p>
              </div>
              <div style={{ ...styles.folder, backgroundColor: '' }}>
                <p>Contacts Directory</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Case;

const styles = {
  folder: {
    border: '1px solid white',
    padding: '10px',
    margin: '5px',
    height: '70px',
    borderRadius: '10px',
    minWidth: '200px',
    textAlign: 'center',
  },
};

{
  /* <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          CLIENT CONTACT INFO AND INTAKE NOTES-- initial intake Notes
          -subsequent intake notes
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          CORRESPONDENCE - reverse chronological order
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          PLEADINGS -lawsuit document -answer document
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          MOTIONS
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          INTERROGATORIES
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          REQUESTS FOR PRODUCTION
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          MEMOS
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          NOTES
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          INVESTIGATION- all documents gathered in the investigation of a file
          that does not fit any other specific category. Includes accident
          reports, initial office conference form, etc.
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          MEDICAL -doc upload 1 authorizations 2 medical RECORDS 3 duplicate
          two-sided copies SCAN PHOTO TO TEXT AND MAKE IT SEARCHABLE??
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          EXPENSES- list form and photo Photos of receipts
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          SPECIAL DAMAGES running list with attached docs
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          RECORDS REQUESTS -photo copy of request for records date + response
          needed
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          PHOTOS
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          WITNESS FOLDERS - every witness in the case pl or ddf electronic
          deposition
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          MISC. 1.Liens 2.taxes 3.school records 4.employment Records
          5.Settlement
        </div>
        <div
          style={{
            height: '255px',
            marginTop: '85px',
            width: '100%',
            border: '1px solid white',
            margin: '20px',
          }}
        >
          {' '}
          Contacts directory
        </div> */
}
