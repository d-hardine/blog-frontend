import axios from "axios"
import { formatDate } from "date-fns"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import PageTitle from "../components/PageTitle"

const Article = () => {
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})

    const pageParams = useParams()
    const articleId = pageParams.articleId

    const fetchSingleArticle = async () => {
        let response = await axios.get(`/api/getArticle/${articleId}`)
        response.data.createdAt = formatDate(response.data.createdAt, 'MM/dd/yyyy, HH:mm')
        response.data.updatedAt = formatDate(response.data.updatedAt, 'MM/dd/yyyy, HH:mm')
        setArticle(response.data)
        setAuthor(response.data.author)
    }

    useEffect(() => {
        fetchSingleArticle()
    }, [])

    return (
        <>
        <PageTitle title={`${article.title} - Hardine Blog`} />
        <main>
            <div>Title: {article.title}</div>
            <div>Body: {article.body}</div>
            <div>Created at: {article.createdAt}</div>
            <div>Written By : {author.firstName} {author.lastName}</div>
        </main>
        </>
    )
}

export default Article