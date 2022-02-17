import React, { useState, useEffect, useRef } from 'react';
import { newInvestigation, sendToBLF } from '../../../API/investigation';
import Image from 'next/image';
import anon from '../../../public/images/anon.png';
import PhotoUpload from '../../../components/PhotoUpload';

const NewInvestigation = () => {
  // const [formData, setFormData] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [investigationId, setInvestigationId] = useState(null);
  const [values, setValues] = useState({
    plaintiff: '',
    defendant: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  // useEffect(() => {
  //   setFormData(new FormData());
  // }, []);

  const handleChange = (e) => {
    e.preventDefault();
    // const value =
    //   e.target.name === 'photo' ? e.target.files[0] : e.target.value;
    // formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendToBLF(values).then((data) => {
      console.log(data);
    });
    newInvestigation(values).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setInvestigationId((prev) => data._id);
      setSubmitted(true);
      alert('new investigation started');
    });
    // newInvestigation(values).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   }
    //   console.log(data);
    //   alert('new investigation started');
    // });
  };

  return (
    <div
      style={{
        color: 'white',
        border: '1px solid white',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>New Investigation</h1>

      <form onSubmit={handleSubmit}>
        <button type="submit">Done</button>
        {/* <div style={{ width: '200px', height: '200px' }}>
          <Image src={anon} alt="anon" />
        </div> */}
        <PhotoUpload
          investigationId={investigationId}
          values={values}
          submitted={submitted}
          defaultPhoto={
            <Image alt="anon" src={anon} height={250} width={250} />
          }
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80vw',
            margin: '5%',
          }}
        >
          {/* <div style={styles.input}>
            <label htmlFor="photo">Photo </label>
            <input onChange={handleChange} name="photo" type="file" />
          </div> */}
          <div style={styles.input}>
            <label htmlFor="name">Plaintiff Name</label>
            <input
              onChange={handleChange}
              name="plaintiff"
              type="text"
              placeholder=""
            />
          </div>
          <div style={styles.input}>
            <label htmlFor="defendent">Defendant Name</label>
            <input
              onChange={handleChange}
              name="defendant"
              type="text"
              placeholder=""
            />
          </div>
          <div style={styles.input}>
            <label htmlFor="phone">Phone Number </label>
            <input
              onChange={handleChange}
              name="phone"
              type="text"
              placeholder=""
            />
          </div>
          <div style={styles.input}>
            <label htmlFor="email">Email </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder=""
            />
          </div>
          <div style={styles.input}>
            <label htmlFor="Address">Address </label>
            <input
              onChange={handleChange}
              name="address"
              type="text"
              placeholder=""
            />
          </div>

          <div style={{ ...styles.input, width: '100%', height: '500px' }}>
            <label htmlFor="notes">Initial Intake Notes </label>
            <textarea
              onChange={handleChange}
              style={{ height: '100%' }}
              name="notes"
              type="text"
              placeholder=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvestigation;

const styles = {
  input: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    width: '50%',
  },
};
