import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../axiosWithToken';


function Articles() {

  const [articleList, setArticleList] = useState([]);
  let navigate = useNavigate();

  const getArticlesOfCurrentAuthor = async () => {
    try {
      const res = await axiosWithToken.get(`http://localhost:4000/user-api/articles`);
      if (res.data.payload) {
        setArticleList(res.data.payload);
      } else {
        console.error('Unexpected response structure:', res.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  const readArticleByArticleId = (articleObj) => {
    // Navigate to the article detail page
    navigate(`../user-article/${articleObj.articleId}`, { state: articleObj });
  };
   
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
  {Array.isArray(articleList) && articleList.length > 0 ? (
    articleList.map((article) => {
      if (article.status === true) {
        return (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        );
      } else {
        return null; 
      }
    })
  ) : (
    <div>No articles found</div>
  )}
</div>

      <Outlet />
    </div>
  )
}

export default Articles