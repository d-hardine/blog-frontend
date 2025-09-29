import { formatDate, formatDistance } from "date-fns"
import { useState, useEffect } from "react"
import axios from "axios"
import './Comments.css'

const Comments = ({comment, loggedUsername, setComments, articleId}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editComment, setEditComment] = useState(comment.body)

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8100'

    const fetchAuthIsAdmin = async () => {
        await axios.get(`${API_BASE_URL}/api/auth`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        }).then((response) => {
            if(response.data.role === 'ADMIN')
                setIsAdmin(true)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        fetchAuthIsAdmin()
    }, [])

    const handleDelete = async (commentId) => {
        const response = await axios.delete(`${API_BASE_URL}/api/delete`, {
            data: {
                commentId,
                articleId,
            }
        })
        setComments(response.data)
    }

    const handleEditComment = async (e, commentId) => {
        e.preventDefault()
        const response = await axios.put(`${API_BASE_URL}/api/edit`, {
            commentId,
            articleId,
            editComment
            }
        )
        setEditMode(false)
        setComments(response.data)
    }

    return (
        <div className="comment-card">
            <div className="comment-card-top">
                <div className="comment-card-top-left">
                    <b>{comment.author.username}</b>
                    {(isAdmin || comment.author.username === loggedUsername) && (
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDelete(comment.id)} width={25} viewBox="0 0 24 24"><title>Delete comment</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                    )}
                    {comment.author.username === loggedUsername && (
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" onClick={() => setEditMode(true)} width={25} viewBox="0 0 24 24"><title>Edit comment</title><path d="M10 21H5C3.89 21 3 20.11 3 19V5C3 3.89 3.89 3 5 3H19C20.11 3 21 3.89 21 5V10.33C20.7 10.21 20.37 10.14 20.04 10.14C19.67 10.14 19.32 10.22 19 10.37V5H5V19H10.11L10 19.11V21M7 9H17V7H7V9M7 17H12.11L14 15.12V15H7V17M7 13H16.12L17 12.12V11H7V13M21.7 13.58L20.42 12.3C20.21 12.09 19.86 12.09 19.65 12.3L18.65 13.3L20.7 15.35L21.7 14.35C21.91 14.14 21.91 13.79 21.7 13.58M12 22H14.06L20.11 15.93L18.06 13.88L12 19.94V22Z" /></svg>
                    )}
                </div>
                <div className="comment-card-top-right">
                    <div title={formatDate(comment.createdAt, 'dd MMM yyyy, HH:mm')}>{formatDistance(comment.createdAt, new Date(), {addSuffix: true})}</div>
                    {comment.createdAt !== comment.updatedAt && (
                        <div title={formatDate(comment.updatedAt, 'dd MMM yyyy, HH:mm')}>{`(Edited ${formatDistance(comment.updatedAt, new Date(), {addSuffix: true})})`}</div>
                    )}
                </div>
            </div>
            {!editMode ? (
                <div className="comment-body">{comment.body}</div>
            ) : (
                <form method="post" onSubmit={(e) => handleEditComment(e, comment.id)}>
                    <textarea name="edit-comment" id="edit-comment" value={editComment} onChange={(e) => setEditComment(e.target.value)} required></textarea>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                    <button>Edit</button>
                </form>
            )}

        </div>
    )

}

export default Comments