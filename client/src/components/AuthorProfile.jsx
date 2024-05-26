import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { CounterContext } from './contexts/CounterContext';

function AuthorProfile() {
  let navigate = useNavigate();
  const [name, setName] = useContext(CounterContext);

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div
        className="d-flex justify-content-around align-items-center p-3"
        style={{
          height: '10vh',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <button className="btn btn-link fs-4 nav-link" style={{ textDecoration: 'none', color: '#6c757d' }} onClick={() => handleNavigate(`/author-profile/article-by-author/${name}`)}>
          <strong>Articles</strong>
        </button>
        <button className="btn btn-link fs-4 nav-link" style={{ textDecoration: 'none', color: '#6c757d' }} onClick={() => handleNavigate('/author-profile/new-article')}>
          <strong>Add new</strong>
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile
