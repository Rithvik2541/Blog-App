import React from 'react'
import {NavLink, Outlet, useNavigate} from 'react-router-dom';


function UserProfile() {
  let navigate = useNavigate();
  return (
      <div className='p-3' style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <button className="btn btn-link fs-4 nav-link d-block mx-auto mt-2" style={{ textDecoration: 'none', color: '#6c757d', position : ''}} onClick={() => navigate('/user-profile/articles')} >
          <strong>Get all Articles</strong>
        </button>
      <Outlet></Outlet>
      </div>
    //</div>
  )
}

export default UserProfile