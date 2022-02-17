import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { newPhoto } from '../API/photo';
import { useRouter } from 'next/router';
import { updateInvestigation } from '../API/investigation';

const PhotoUpload = ({ defaultPhoto, submitted, values, investigationId }) => {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(null);

  const submit = useRef();

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  useEffect(() => {
    submitted && submit.current.click();
  }, [submitted]);

  const handleChange = (e) => {
    e.preventDefault();
    const photo = e.target.files[0];
    setPreview(URL.createObjectURL(photo));
    formData.set(e.target.name, photo);
    //////I NEED THE NAME
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.get('photo')) {
      formData.set('fileName', router.query.slug || values.plaintiff);

      newPhoto(formData).then((data) => {
        if (data.error) {
          console.log(data.error);
        }

        investigationId &&
          updateInvestigation(investigationId, { photo: data._id });
        router.push('/admin/cases');
      });
    }
  };
  return (
    <div>
      <div
        style={{
          height: '250px',
          width: '250px',
          border: '1px solid white',
          marginBottom: '20px',
        }}
      >
        {preview ? (
          <Image
            layout="responsive"
            alt="profile photo"
            src={preview}
            height={200}
            width={200}
          />
        ) : (
          defaultPhoto
        )}
      </div>

      <input
        name="photo"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        style={
          router.pathname.includes('new-investigation')
            ? { display: 'none' }
            : {}
        }
        onClick={handleSubmit}
        ref={submit}
      >
        UPLOAD PHOTO
      </button>
    </div>
  );
};

export default PhotoUpload;
