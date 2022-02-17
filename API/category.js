import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createCategory = (category) => {
  return fetch(`${API}/category`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  }).then((response) => {
    return response.json();
  });
};

export const listCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};
