import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams, Link } from "react-router"
import { formatDate, formatDistance } from 'date-fns'
import PageTitle from '../components/PageTitle'
import Navigation from "../components/Navigation"

const Search = () => {
    const [articles, setArticles] = useState([])
    const [searchParams] = useSearchParams()

    const fetchSearch = async () => {
        try {
            const response = await axios.get(`/api/searchArticles?q=${searchParams.get('q')}`)
            setArticles(response.data)
        } catch (error) {
            console.error('Error during search:', error);
        }
    }

    useEffect(() => {
        fetchSearch()
    }, [searchParams.get('q')])

    return (
        <>
        <PageTitle title={`Search for "${searchParams.get('q')}" | Hardine Blog`} />
        <main className="main-homepage">
            <div className="main-homepage-left">
                <h2 className='latest-article'>Search for "{searchParams.get('q')}"</h2>
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
    )
}

export default Search