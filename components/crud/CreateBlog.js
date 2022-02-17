import React, { useState, useEffect, useContext } from 'react';
import renderHtml from 'react-render-html';
import Banner from '../../components/Banner';
import bannerImage from '../../public/images/bruerpub.jpg';
import { createCategory, listCategories } from '../../API/category';
import { createBlog } from '../../API/blog';
import { socketContext } from '../../pages/_app';

import styles from '../../styles/CreateBlog.module.css';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [hydrate, setHydrate] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [socket, setSocket] = useState(null);

  const handleBody = (e) => {
    setBody(e);
  };

  // const sock = useContext(socketContext);

  useEffect(() => {
    loadCategories();
  }, [hydrate]);

  const loadCategories = () => {
    listCategories().then((res) => {
      setCategories(res);
    });
  };

  return (
    <>
      <Banner
        typeWriter
        image={bannerImage}
        imageAlt={'books'}
        bannerText={`Bruer Law Firm Publications`}
      />

      <textarea
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{
          width: '100%',
          fontSize: '1.5rem',
          textAlign: 'center',
        }}
        placeholder="title"
        value={title}
      />
      <div style={{ display: 'flex' }}>
        <ReactQuill
          modules={CreateBlog.modules}
          formats={CreateBlog.formats}
          value={body}
          onChange={handleBody}
          placeholder={'write something amazing...'}
        />
        <div
          style={{
            width: '34%',
            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: 'lightgrey',
            margin: '5px',
          }}
        >
          <h2>Sidebar</h2>

          <div>
            <h3>Categories</h3>

            {categories.map((c, i) => {
              return (
                <div key={i}>
                  <label htmlFor={c._id}>{c.name}</label>
                  <input
                    onChange={(e) => {
                      e.target.checked
                        ? setSelectedCategories([
                            ...selectedCategories,
                            e.target.name,
                          ])
                        : setSelectedCategories(
                            selectedCategories.filter(
                              (c) => c !== e.target.name
                            )
                          );
                    }}
                    name={c._id}
                    type="checkbox"
                  />
                </div>
              );
            })}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createCategory(newCategory).then(() => {
                  setHydrate((prev) => !prev);
                  setNewCategory('');
                });
              }}
            >
              <input
                required
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
                placeholder="new category"
                value={newCategory}
              />
              <button type="submit">+</button>
            </form>
            <button
              onClick={() => {
                if ((title, body)) {
                  createBlog(title, body, selectedCategories);
                } else {
                  if (!title) {
                    alert('A title is required');
                  }
                  if (!body) {
                    alert('You have not written anything!');
                  }
                }
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];
