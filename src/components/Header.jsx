import { Link } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Header.css'

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    async function fetchAuth() {
        const token = localStorage.getItem('jwtToken')
        if(token) {
            const response = await axios.get('/api/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.status)
            if(response.status === 200)
                setIsAuthenticated(true)
        }
    }

    
    useEffect(() => {
        fetchAuth()
    }, [])

    return (
        <header>
            <div className="left-container">
                <Link to="/">Home</Link>
            </div>
            {isAuthenticated ? (
                <>
                <div className="right-container">
                    <div>username</div>
                    <Link to="Logout"><button>Logout</button></Link>
                </div>
                </>
            ) : (
                <>
                <div className="right-container">
                    <Link to="Signup"><button>Signup</button></Link>
                <   Link to="Login"><button>Login</button></Link>
                </div>
                </>
            )}
        </header>
    )
}

export default Header