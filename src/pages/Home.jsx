import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios'
import PageTitle from '../components/PageTitle';

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
      <main>
        <p>Whooooooo!</p>
        <ul>
          {articles.map((article) =>
            <li key={article.id}>Article: <Link to={`/article/${article.id}`}>{article.title}</Link></li>
          )}
        </ul>
      </main>
    </>
  );
};

export default Home;