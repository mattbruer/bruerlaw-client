import React, { useState, useEffect } from 'react';
import { listCategories } from '../API/blog';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    listCategories().then((data) => {
      if (data.error) {
        return console.log(data.error);
      }

      setCategories(data);
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '250px',
        width: '100%',
        backgroundColor: '#123',
        overflowX: 'scroll',
      }}
    >
      {categories.map((c, i) => {
        return (
          <div
            style={{
              minWidth: '250px',
              border: '1px solid black',
              backgroundColor: 'white',
              margin: '5px',
              borderRadius: '10px',
            }}
            key={i}
          >
            <p>{c.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesList;
