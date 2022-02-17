import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getCase = (slug) => {
  return fetch(`${API}/cases/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};

export const getAllCases = () => {
  return fetch(`${API}/cases/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};
