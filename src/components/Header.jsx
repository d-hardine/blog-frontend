import { Link, useNavigate } from 'react-router'
import './Header.css'

function Header({isAuthenticated, setIsAuthenticated, usernameGlobal, setUsernameGlobal}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsAuthenticated(false)
        setUsernameGlobal('')
        localStorage.clear()
        navigate('/')
    }

    return (
        <header>
            <div className="left-container">
                <Link to="/">Home</Link>
            </div>
            {isAuthenticated ? (
                <div className="right-container">
                    <div>{usernameGlobal}</div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ): (
                <div className="right-container">
                    <Link to="Signup"><button>Signup</button></Link>
                    <Link to="Login"><button>Login</button></Link>
                </div>
            )}

        </header>
    )
}

export default Header