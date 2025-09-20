import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import './Navigation.css'

function Navigation() {
    const [categories, setCategories] = useState([])


    const fetchCategories = async () => {
        const response = await axios.get('/api/getCategories')
        setCategories(response.data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="Navigation-container">
            <h2>Search</h2>
            <form action="" className='search-form'>
                    <label htmlFor="search-article" id="search-article"></label>
                    <input type="text" name="search-article" id="search-article" />
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