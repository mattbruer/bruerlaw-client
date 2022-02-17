import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (title, body, categories) => {
  return fetch(`${API}/blog`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, categories }),
  }).then((response) => {
    return response.json();
  });
};

export const listBlogs = () => {
  return fetch(`${API}/blogs`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

export const listCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

export const getSingleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

export const updateBlog = (slug, updatedField) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedField),
  }).then((response) => {
    return response.json();
  });
};
