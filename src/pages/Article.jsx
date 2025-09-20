import axios from "axios"
import { formatDate, formatDistance } from "date-fns"
import { useEffect, useState } from "react"
import { useParams, useOutletContext, Link } from "react-router"
import PageTitle from "../components/PageTitle"
import Navigation from "../components/Navigation"
import './Article.css'

const Article = () => {
    const [isAuthenticated, setIsAuthenticated] = useOutletContext()

    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const pageParams = useParams()
    const articleId = pageParams.articleId

    const fetchSingleArticle = async () => {
        let response = await axios.get(`/api/getArticle/${articleId}`)
        response.data.createdAt = formatDate(response.data.createdAt, 'dd MMM yyyy, HH:mm')
        setArticle(response.data)
        setAuthor(response.data.author)
    }

    const fetchComments = async () => {
        const response = await axios.get(`/api/getComments/${articleId}`)
        setComments(response.data)
    }

    useEffect(() => {
        fetchSingleArticle()
        fetchComments()
    }, [])

    const submitComment = async (e) => {
        e.preventDefault()
        if(newComment.length > 0) { //if the new comment is not empty
            await axios.post('/api/postNewComment', {
                articleId: article.id,
                userId: localStorage.getItem('userId'),
                newComment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }).then((response) => {
                console.log(response)
                setComments(response.data)
                setNewComment('')
            })
        }
        e.target.reset()
    }

    return (
        <>
        <PageTitle title={`${article.title} | Hardine Blog`} />
        <main>
            <div className="article-container">
                <div className="article-container-left">
                    <div className="article-title">{article.title}</div>
                    <div className="article-author-and-date">by {author.firstName} {author.lastName} on {article.createdAt}</div>
                    <br />
                    <div>{article.body}</div>
                    <br />
                </div>
                <Navigation />
            </div>
            <div className="comment-section"><b>COMMENTS</b></div>
            <hr />
            <div className="comment-card-container">
            {isAuthenticated && (
                <form action="/api/comment" onSubmit={submitComment} method="post">
                    <label htmlFor="newComment" id="newComment"><b>{localStorage.getItem('username')}</b></label>
                    <br />
                    <textarea name="newComment" id="newComment" maxLength={150} onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <br />
                    <button>Comment</button>
                </form>
            )}
            {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                    <div className="comment-card-top">
                        <div><b>{comment.author.username}</b></div>
                        <div title={formatDate(comment.createdAt, 'dd MMM yyyy, HH:mm')}>{formatDistance(comment.createdAt, new Date(), {addSuffix: true})}</div>
                    </div>
                    <br />
                    <div>{comment.body}</div>
                </div>
            ))}
            </div>
        </main>
        </>
    )
}

export default Article