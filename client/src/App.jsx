import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from "./components/Home"
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Root from './components/Root';
import AuthorProfile from './components/AuthorProfile';
import UserProfile from './components/UserProfile';
import { useNavigate } from 'react-router-dom';
import UserArticle from './components/UserArticles';
import ArticleByAuthor from './components/ArticleByAuthor';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import AuthorArticle from './components/AuthorArticle';
import Interview from './Interview';
import RouterError from './components/RouterError';





function App() {
  
  // let Navigate = useNavigate();

  let router = createBrowserRouter([
    {
      path : '',
      element : <Root/>,
      errorElement : <RouterError/>,
      children : [
           {
             path : '',
             element : <Home/>
           },

           {
            path : 'SignIn',
            element : <SignIn/>
           },

           {
           path : 'SignUp',
           element : <SignUp/>
           },
           {
            path : 'user-profile',
            element : <UserProfile/>,
            children : [
              {
                path : 'articles',
                element : <Articles/>
              },
              {
                path : 'user-article/:articleId',
                element : <UserArticle/>
              },
              {
                path : '',
                element : <Navigate to = 'articles' />
              }
            ]
           },
           {
            path : 'author-profile',
            element : <AuthorProfile/>,
            //first plain ga articles, add new buttons undaali... 
            children : [
              {
                path : 'new-article',
                element : <AddArticle/>
              },
              {
                path : 'article-by-author/:author',
                element : <ArticleByAuthor />
              },
              {
                path : 'author-article/:articleId',
                element : <AuthorArticle/>
              },
              {
                path : '',
                element : <Navigate to = 'article-by-author/:author' />
              }
            ]
           }
      ]
    }
  ])

  return (
    <div className="App">
      < RouterProvider router = {router} />
      {/* <Interview></Interview> */}
    </div>
  );
}

export default App;
