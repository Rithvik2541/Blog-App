import React, { useContext, useState } from 'react';
import { CounterContext } from './contexts/CounterContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosWithToken } from '../axiosWithToken';

function AuthorArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [name, setName] = useContext(CounterContext);
  const [editStatus, setEditStatus] = useState(false);
  let navigate = useNavigate();
  
  let { state } = useLocation();
  
  const [currentArticle, setCurrentArticle] = useState(state);

  const deletArticle = async ()=>{
     let article = {... currentArticle};
     delete article._id;
     let res = await axiosWithToken.put(`//localhost:4000/author-api/article/${article.articleId}`, article)
     if(res.data.message ==="article deleted"){
       setCurrentArticle({...currentArticle, status : res.data.payload})
     }
  }

  async function restoreArticle(){
    let article = {... currentArticle};
    delete article._id;
    let res = await axiosWithToken.put(`//localhost:4000/author-api/article/${article.articleId}`, article)
    if(res.data.message ==="article restored"){
      setCurrentArticle({...currentArticle, status : res.data.payload})
    }
  }

  function editArticle(){
    setEditStatus(true);
  }

  async function disable(data){
    let modifiedArticle = {...state, ...data}
    
    modifiedArticle.dateOfModification = new Date();
    delete modifiedArticle._id;
    console.log(modifiedArticle)
    let res = await axiosWithToken.put('http://localhost:4000/author-api/article', modifiedArticle)

    if(res.data.message === 'article updated'){
        setEditStatus(false)
        navigate(`/author-profile/author-article/${modifiedArticle.articleId}`, {state: res.data.article})
    }
    else{
        console.log(res.data.message)
    }
  }

  return (
    <div className='p-3'>
        {
            editStatus === false ? <><div className="d-flex justify-content-between">
            <div>
              <p className="display-3 me-4">{state.title}</p>
              <span className="py-3">
                <small className="text-secondary me-4">Created on: {state.dateOfCreation}</small>
                <small className="text-secondary">Modified on: {state.dateOfModification}</small>
              </span>
            </div>
            <div>
              <button className='btn btn-primary me-2' onClick={editArticle}>Edit</button>

              {
                currentArticle.status === true ? 
                  <button className='btn btn-danger ms-2' onClick={deletArticle}>Delete</button>
                :
                  <button className='btn btn-success ms-2' onClick={restoreArticle}>Restore</button>
                
              }

            </div>
          </div>
          <div>
            <p className='lead mt-2' style={{ whiteSpace: "pre-line" }}>{state.content}</p>
          </div>
    
          <div className="comments-display m-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {state.comments.length === 0 ? (
              <div className="display-3">No comments</div>
            ) : (
                state.comments.map((commentObj, id) => (
                    <div className="bg-light p-3 mb-3" key={id}>
                    <h3>Comments</h3>
                  <p className='fs-4' style={{ textTransform: 'capitalize' }}>USER: <strong>{commentObj.name}</strong></p>
                  <p className='lead'>{commentObj.comment}</p>
                </div>
              ))
            )}
          </div></>:
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
          <form onSubmit={handleSubmit(disable)}>
            <h3 className="card-title text-center mb-4">Write an Article</h3>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                {...register('title', { required: true })}
                    defaultValue = {state.title}
                
              />
              {errors.title && <span className="text-danger">Title is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Select a category</label>
              <select
                className="form-select"
                id="category"
                {...register('category', { required: true })}
                defaultValue = {state.category}
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
                defaultValue = {state.content}
              ></textarea>
              {errors.content && <span className="text-danger">Content is required</span>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">Post</button>
            </div>
          </form>
        </div>
        </div>
        </div>
        }
      
    </div>
  );
}

export default AuthorArticle;
