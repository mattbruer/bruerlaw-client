import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getVisitorLog = () => {
  return fetch(`${API}/visitor`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

export const newVisitor = (email) => {
  return fetch(`${API}/visitor`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then((res) => {
    return res.json();
  });
};
