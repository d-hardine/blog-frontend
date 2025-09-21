import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import './Navigation.css'

function Navigation() {
    const [categories, setCategories] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const navigate = useNavigate()

    const fetchCategories = async () => {
        const response = await axios.get('/api/getCategories')
        setCategories(response.data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(searchInput)
            navigate(`/search?q=${searchInput}`)
    }

    return (
        <div className="Navigation-container">
            <h2>Search</h2>
            <form onSubmit={handleSearch} className='search-form'>
                    <label htmlFor="search-article" id="search-article"></label>
                    <input type="text" name="search-article" id="search-article" onChange={(e) => setSearchInput(e.target.value)} />
                    <button>Search</button>
                </form>
                <h2>Categories</h2>
                <ul>
                    {categories.map(category => (
                        <li key={category.id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
                    ))}
               </ul>
        </div>
    )
}

export default Navigation