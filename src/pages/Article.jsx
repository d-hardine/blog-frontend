import axios from "axios"
import { formatDate, formatDistance } from "date-fns"
import { useEffect, useState } from "react"
import { useParams, useOutletContext, Link } from "react-router"
import PageTitle from "../components/PageTitle"
import Navigation from "../components/Navigation"
import './Article.css'

const Article = () => {
    const [loggedUsername, setLoggedUsername] = useOutletContext()

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

    const handleDelete = async (commentId) => {
        const response = await axios.delete('/api/delete', {
            data: {
                commentId,
                articleId: articleId,
            }
        })
        console.log(response.data)
        setComments(response.data)
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
                <div className="comment-card" key={comment.id}>
                    <div className="comment-card-top">
                        <div className="comment-card-top-left">
                            <b>{comment.author.username}</b>
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDelete(comment.id)} width={25} viewBox="0 0 24 24"><title>Delete comment</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24"><title>Edit comment</title><path d="M10 21H5C3.89 21 3 20.11 3 19V5C3 3.89 3.89 3 5 3H19C20.11 3 21 3.89 21 5V10.33C20.7 10.21 20.37 10.14 20.04 10.14C19.67 10.14 19.32 10.22 19 10.37V5H5V19H10.11L10 19.11V21M7 9H17V7H7V9M7 17H12.11L14 15.12V15H7V17M7 13H16.12L17 12.12V11H7V13M21.7 13.58L20.42 12.3C20.21 12.09 19.86 12.09 19.65 12.3L18.65 13.3L20.7 15.35L21.7 14.35C21.91 14.14 21.91 13.79 21.7 13.58M12 22H14.06L20.11 15.93L18.06 13.88L12 19.94V22Z" /></svg>
                        </div>
                        <div title={formatDate(comment.createdAt, 'dd MMM yyyy, HH:mm')}>{formatDistance(comment.createdAt, new Date(), {addSuffix: true})}</div>
                    </div>
                    <div className="comment-body">{comment.body}</div>
                </div>
            ))}
            </div>
        </main>
        </>
    )
}

export default Article