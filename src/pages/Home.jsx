import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { formatDate, formatDistance } from 'date-fns'
import PageTitle from '../components/PageTitle'
import './Home.css'
import Navigation from '../components/Navigation'

const Home = () => {
  const [articles, setArticles] = useState([])

  const fetchArticles = async () => {
    const response = await axios.get('/api/getArticles')
    setArticles(response.data)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <>
      <PageTitle title="Hardine Blog" />
      <main className='main-homepage'>
        <div className="main-homepage-left">
          <h2 className='latest-article'>Latest Articles</h2>
          <div className='article-card-container'>
            {articles.map((article) =>
              <div key={article.id} className='article-card'>
                <div className='article-categories'>{article.categories[0].name}</div>
                <div className='article-title'><Link to={`/article/${article.id}`}>{article.title}</Link></div>
                <div title={formatDate(article.createdAt, 'dd MMM yyyy, HH:mm')}>
                  {formatDistance(article.createdAt, new Date(), {addSuffix: true})} | {article.comments.length} comment{'(s)'}
                </div>
              </div>
            )}
          </div>
        </div>
        <Navigation />
      </main>
    </>
  );
};

export default Home;