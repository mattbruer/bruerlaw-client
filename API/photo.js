import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const newPhoto = (formData) => {
  return fetch(`${API}/photo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
