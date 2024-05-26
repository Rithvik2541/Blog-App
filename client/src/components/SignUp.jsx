import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  async function submitted(userObj) {
    try {
      let res;
      if (userObj.role === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', userObj);
      } else {
        res = await axios.post('http://localhost:4000/author-api/author', userObj);
      }

      if (res.data.message === 'user Existed' || res.data.message === 'author Existed') {
        navigate('/SignIn');
      } else {
        console.log(userObj);
        setErr(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setErr('An error occurred during registration.');
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '24rem' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Signup</h3>
          {err && <p className='text-danger'>{err}</p>}
          <form onSubmit={handleSubmit(submitted)}>
            <div className="mb-3 d-flex justify-content-between">
              <label className="form-label fs-6"><strong>Register:</strong></label>
              <div>
                {errors.role && <span className="text-danger">Select a role</span>}
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="author" 
                    value="author" 
                    {...register('role', { required: true })} 
                    onChange={handleRoleChange} 
                  />
                  <label className="form-check-label" htmlFor="author">Author</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="user" 
                    value="user" 
                    {...register('role', { required: true })} 
                    onChange={handleRoleChange} 
                    defaultChecked 
                  />
                  <label className="form-check-label" htmlFor="user">User</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {role === 'author' ? 'Author Name' : 'User Name'}
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                htmlFor = 'name'
                {...register('name', { required: true })} 
              />
              {errors.name && role === 'user' && <span className="text-danger">Username is required</span>}
              {errors.name && role === 'author' && <span className="text-danger">Author Name is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                {...register('password', { required: true })} 
              />
              {errors.password && <span className="text-danger">Password is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                {...register('email', { required: true })} 
              />
              {errors.email && <span className="text-danger">Email is required</span>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
