import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const newInvestigation = (values) => {
  return fetch(`${API}/investigation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => {
    return res.json();
  });
};

export const listInvestigations = () => {
  return fetch(`${API}/investigations`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};

export const getSingleInvestigation = (slug) => {
  return fetch(`${API}/investigations/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};

export const updateInvestigation = (id, field) => {
  return fetch(`${API}/investigations/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updatedField: field }),
  }).then((res) => {
    return res.json();
  });
};

export const acceptCase = (data) => {
  return fetch(`${API}/case`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  }).then((res) => {
    return res.json();
  });
};

export const sendToBLF = (data) => {
  console.log(data);
  return fetch('https://www.bruerlawfirm.com/Upload/index.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  }).then((res) => {
    console.log('here');
    return res.json();
  });
};
