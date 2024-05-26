import React, { useState, useEffect,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';
import axios from 'axios';
import { CounterContext } from './contexts/CounterContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { loginUserStatus, errorOccured, errMsg, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [err, setErr] = useState('');

  let [name, setName] = useContext(CounterContext);
  let [role,setRole] = useContext(CounterContext);
   let [userDet, setUserDet] = useContext(CounterContext);
  

  // useEffect(() => {
  //   if (loginUserStatus === true) {
  //     navigate('/user-profile');
  //   }
  // }, [loginUserStatus, navigate]);

  async function submitted(userObj) {

    setRole(userObj.role);
    setName(userObj.name);
    // setUserDet(userObj);
    // console.log("form userdet:"+userDet);

    console.log(userObj);
    dispatch(userAuthorLoginThunk(userObj));

    try {
      if(userObj.role==='user'){
        const res = await axios.post('http://localhost:4000/user-api/login', userObj);
        console.log(res.data.message);
        if (res.data.message === "Login success") {
          //console.log("Login success");
          navigate('/user-profile')
        }
        else {
          setErr(res.data.message);
        }
      }else{
        const res = await axios.post('http://localhost:4000/author-api/login', userObj);
        console.log(res.data.message);
        if (res.data.message === "Login success") {
          //console.log("Login success");
          navigate('/author-profile')
        }
        else {
          setErr(res.data.message);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErr('An error occurred during login.');
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '24rem' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">LOGIN</h3>
          {err && <p className='text-danger'>{err}</p>}
          <form onSubmit={handleSubmit(submitted)}>
            <div className="mb-3 d-flex justify-content-between">
              <label className="form-label fs-6"><strong>Login as:</strong></label>
              <div>
                {errors.role && <span className="text-danger">Select a role</span>}
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="author"
                    value="author"
                    {...register('role', { required: true })}
                  />
                  <label className="form-check-label" htmlFor="author">Author</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="user"
                    value="user"
                    {...register('role', { required: true })}
                  />
                  <label className="form-check-label" htmlFor="user">User</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-danger">Name is required</span>}
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
            <div className="d-grid">
              <button type="submit" className="btn btn-success">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;




// import React, { useState, useEffect, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';
// import axios from 'axios';
// import { CounterContext } from './contexts/CounterContext';
// import { useNavigate } from 'react-router-dom';

// function SignIn() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { loginUserStatus, errorOccured, errMsg, currentUser } = useSelector(state => state.userAuthorLoginReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [err, setErr] = useState('');
//   const { name, setName, role, setRole, userDet, setUserDet } = useContext(CounterContext); // Fixed the context access

//   async function submitted(userObj) {
//     setRole(userObj.role);
//     setName(userObj.name);
//     setUserDet(userObj);

//     console.log(userObj);
//     dispatch(userAuthorLoginThunk(userObj));

//     try {
//       if (userObj.role === 'user') {
//         const res = await axios.post('http://localhost:4000/user-api/login', userObj);
//         console.log(res.data.message);
//         if (res.data.message === "Login success") {
//           navigate('/user-profile');
//         } else {
//           setErr(res.data.message);
//         }
//       } else {
//         const res = await axios.post('http://localhost:4000/author-api/login', userObj);
//         console.log(res.data.message);
//         if (res.data.message === "Login success") {
//           navigate('/author-profile');
//         } else {
//           setErr(res.data.message);
//         }
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErr('An error occurred during login.');
//     }
//   }

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: '24rem' }}>
//         <div className="card-body">
//           <h3 className="card-title text-center mb-4">LOGIN</h3>
//           {err && <p className='text-danger'>{err}</p>}
//           <form onSubmit={handleSubmit(submitted)}>
//             <div className="mb-3 d-flex justify-content-between">
//               <label className="form-label fs-6"><strong>Login as:</strong></label>
//               <div>
//                 {errors.role && <span className="text-danger">Select a role</span>}
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="role"
//                     id="author"
//                     value="author"
//                     {...register('role', { required: true })}
//                   />
//                   <label className="form-check-label" htmlFor="author">Author</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="role"
//                     id="user"
//                     value="user"
//                     {...register('role', { required: true })}
//                   />
//                   <label className="form-check-label" htmlFor="user">User</label>
//                 </div>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 {...register("name", { required: true })}
//               />
//               {errors.name && <span className="text-danger">Name is required</span>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 {...register('password', { required: true })}
//               />
//               {errors.password && <span className="text-danger">Password is required</span>}
//             </div>
//             <div className="d-grid">
//               <button type="submit" className="btn btn-success">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;



