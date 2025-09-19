import axios from "axios"
import { formatDate } from "date-fns"
import { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router"
import PageTitle from "../components/PageTitle"
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
            <div>Title: {article.title}</div>
            <div>Body: {article.body}</div>
            <div>Created at: {article.createdAt}</div>
            <div>Written By : {author.firstName} {author.lastName}</div>
            <hr />
            <div>comment section</div>
            <hr />
            <div className="comment-card-container">
            {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                    <div>comment author: {comment.author.username}</div>
                    <div>comment content: {comment.body}</div>
                    <div>comment date: {formatDate(comment.createdAt, 'dd MMM yyyy, HH:mm')}</div>
                </div>
            ))}
            </div>
            {isAuthenticated && (
                <form action="/api/comment" onSubmit={submitComment} method="post">
                    <label htmlFor="newComment" id="newComment"></label>
                    <textarea name="newComment" id="newComment" onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <button>Comment</button>
                </form>
            )}
        </main>
        </>
    )
}

export default Article