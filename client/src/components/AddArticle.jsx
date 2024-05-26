import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CounterContext } from './contexts/CounterContext';
import axios from 'axios';

function AddArticle() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [name, setName] = useContext(CounterContext); 
    const { currentUser } = useSelector(state => state.userAuthorLoginReducer);
    
    const [err, setErr] = useState('');
    const navigate = useNavigate(); 
    const token = localStorage.getItem('token');
    
    const axiosWithToken = axios.create({
      headers: { Authorization: `Bearer ${token}` }
    });

    const onSubmit = async (data) => {
      data.dateOfCreation = new Date();
      data.dateOfModification = new Date();
      data.articleId = Date.now();
      data.name = name;
      data.comments = [];
      data.status = true;

      try {
        const res = await axiosWithToken.post('http://localhost:4000/author-api/article', data);
        if (res.data.message === 'article added') {
          navigate(`/author-profile/article-by-author/${name}`); 
        } else {
          setErr(res.data.message);
        }
      } catch (error) {
        console.error("Error submitting the article:", error);
        setErr('An error occurred while submitting the article');
      }
    };

    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div
          className="card p-4 shadow"
          style={{
            width: '40rem',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="card-title text-center mb-4">Write an Article</h3>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  {...register('title', { required: true })}
                />
                {errors.title && <span className="text-danger">Title is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Select a category</label>
                <select
                  className="form-select"
                  id="category"
                  {...register('category', { required: true })}
                >
                  <option value="">Select a category</option>
                  <option value="programming">Programming</option>
                  <option value="javascript">JavaScript</option>
                  <option value="mern">MERN Stack</option>
                  <option value="blogging">Blogging</option>
                </select>
                {errors.category && <span className="text-danger">Category is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="8"
                  {...register('content', { required: true })}
                ></textarea>
                {errors.content && <span className="text-danger">Content is required</span>}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default AddArticle;
