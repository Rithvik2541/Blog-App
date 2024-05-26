import React, { useContext, useState } from 'react';
import { CounterContext } from './contexts/CounterContext';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosWithToken } from '../axiosWithToken';

function UserArticles() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [name, setName] = useContext(CounterContext);
  let [role, setRole] = useContext(CounterContext);
  let [comment, setComment] = useState('');

  async function writeComment(comment) {
    comment.name = name;
    console.log(comment);
    const res = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`, comment);
    if (res.data.message === 'comment added') {
      setComment(res.data.message);
    }
  }

  let { state } = useLocation();

  console.log("Role:", role);
  console.log("Name:", name);

  return (
    <div className='p-3' style={{ paddingBottom: '100px' }}> {/* Adjust padding-bottom to ensure space for the footer */}
      <div className="d-flex justify-content-between">
        <div>
          <p className="display-3 me-4">{state.title}</p>
          <span className="py-3">
            <small className="text-secondary me-4">
              Created on: {state.dateOfCreation}
            </small>
            <small className="text-secondary">
              Modified on: {state.dateOfModification}
            </small>
          </span>
        </div>
      </div>
      <div>
        <p className='lead mt-2' style={{ whiteSpace: 'pre-line' }}>{state.content}</p>
      </div>

      <div className="comments-display m-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {state.comments.length === 0 ? (
          <div className="display-3">no comments...</div>
        ) : (
          state.comments.map((commentObj, id) => (
            <div key={id} className="bg-light p-3 mb-2">
              <p className='fs-4' style={{ textTransform: 'capitalize' }}>USER: <strong>{commentObj.name}</strong></p>
              <p className='lead'>{commentObj.comment}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <h1>{comment}</h1>
        <form onSubmit={handleSubmit(writeComment)}>
          <input 
            type="text" 
            {...register("comment")} 
            name='comment' 
            id='comment' 
            placeholder='write a comment here...' 
            className='form-control mb-4' 
          />
          <button className='btn btn-success' type='submit'>Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default UserArticles;
