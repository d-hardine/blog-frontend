import axios from "axios"
import { formatDate } from "date-fns"
import { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router"
import parse from 'html-react-parser'
import PageTitle from "../components/PageTitle"
import Navigation from "../components/Navigation"
import Comments from "../components/Comments"
import './Article.css'

const Article = () => {
    const [loggedUsername] = useOutletContext()

    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const pageParams = useParams()
    const articleId = pageParams.articleId

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8100'

    const fetchSingleArticle = async () => {
        let response = await axios.get(`${API_BASE_URL}/api/getArticle/${articleId}`)
        response.data.createdAt = formatDate(response.data.createdAt, 'dd MMM yyyy, HH:mm')
        response.data.updatedAt = formatDate(response.data.updatedAt, 'dd MMM yyyy, HH:mm')
        response.data.body = parse(response.data.body)
        setArticle(response.data)
        setAuthor(response.data.author)
    }

    const fetchComments = async () => {
        const commentResponse = await axios.get(`${API_BASE_URL}/api/getComments/${articleId}`)
        setComments(commentResponse.data)
    }

    useEffect(() => {
        fetchSingleArticle()
        fetchComments()
    }, [])

    const submitComment = async (e) => {
        e.preventDefault()
        if(newComment.length > 0) { //if the new comment is not empty
            await axios.post(`${API_BASE_URL}/api/postNewComment`, {
                articleId: article.id,
                newComment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }).then((response) => {
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
            {loggedUsername && (
                <form action="/api/comment" onSubmit={submitComment} method="post">
                    <label htmlFor="newComment" id="newComment"><b>{loggedUsername}</b></label>
                    <br />
                    <textarea name="newComment" id="newComment" maxLength={150} onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <br />
                    <button>Comment</button>
                </form>
            )}
            {comments.map((comment) => (
                <Comments key={comment.id} comment={comment} loggedUsername={loggedUsername} setComments={setComments} articleId={articleId}/>
            ))}
            </div>
        </main>
        </>
    )
}

export default Article