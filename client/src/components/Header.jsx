import React, {useContext} from 'react'
import { NavLink, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { CounterContext } from './contexts/CounterContext';
import { resetState } from '../redux/slices/userAuthorSlice';


function Header() {
  let {loginUserStatus, errorOccured, errMsg, currentUser} = useSelector(state=>state.userAuthorLoginReducer);
  let [name, setName] = useContext(CounterContext);
  let dispatch = useDispatch();
  
  function SignOut(){
    //remove from local storage
    localStorage.removeItem('token')
    dispatch(resetState())
  }

  return (
    <div className="d-flex justify-content-between bg-secondary shadow p-2">
      <div>
        <img 
          src="https://vignette.wikia.nocookie.net/narutofanon/images/d/db/JashinMS.jpg.png/revision/latest?cb=20180331051518" 
          alt="" 
          width="60px" className='ms-3 mt-3' 
        />
      </div>
      <div>
        <ul className="nav nav-tabs justify-content-end p-3">
          {loginUserStatus===false?
            <>
          <li className="nav-item">
            <Link className="nav-link text-white" aria-current="page" to="">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" aria-current="page" to="SignIn">SignIn</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" aria-current="page" to="SignUp">SignUp</Link>
          </li> </> : <li className="nav-item">
            <Link className="nav-link text-white" aria-current="page" to="SignIn" onClick={SignOut}>
              <p className='fs-3'>Welcome {name}</p>
              SignOut</Link>
          </li>}

        </ul>
      </div>
    </div>
  )
}

export default Header
