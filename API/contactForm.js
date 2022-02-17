import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const sendMessage = (message) => {
  return fetch(`${API}/contactForm`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then((response) => {
    return response.json();
  });
};

export const getMessages = () => {
  return fetch(`${API}/contactForm`, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};

export const getSingleMessage = (id) => {
  return fetch(`${API}/contactForm/${id}`, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
};

export const updateReadStatus = (id) => {
  return fetch(`${API}/contactForm/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((response) => {
    return response.json();
  });
};
