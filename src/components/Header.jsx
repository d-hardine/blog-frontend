import { Link, useNavigate } from 'react-router'
import './Header.css'

function Header({isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.clear()
        navigate('/')
    }

    return (
        <header>
            <Link to='/' className='left-container'>
                <svg enableBackground="new 0 0 32 32" width={60} version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Desktop25"/><g id="Desktop24"/><g id="Desktop23"/><g id="Desktop22"/><g id="Desktop21"/><g id="Desktop20"/><g id="Desktop19"/><g id="Desktop18"/><g id="Desktop17"/><g id="Desktop16"/><g id="Desktop15"/><g id="Desktop14"/><g id="Desktop13"/><g id="Desktop12"/><g id="Desktop11"/><g id="Desktop10"/><g id="Desktop09"><g><path d="M27,4v24c0,1.65-1.35,3-3,3H8c-1.65,0-3-1.35-3-3V4c0-1.65,1.35-3,3-3h16C25.65,1,27,2.35,27,4z" fill="#3F51B5"/></g><g><path d="M23,6v16c0,0.55-0.45,1-1,1H10c-0.55,0-1-0.45-1-1V6c0-0.55,0.45-1,1-1h12C22.55,5,23,5.45,23,6z" fill="#2197F3"/></g><g><circle cx="16" cy="26" fill="#FFC10A" r="2"/></g></g><g id="Desktop08"/><g id="Desktop07"/><g id="Desktop06"/><g id="Desktop05"/><g id="Desktop04"/><g id="Desktop03"/><g id="Desktop02"/><g id="Desktop01"/></svg>
                <div>Hardine Blog</div>
            </Link>
            {isAuthenticated ? (
                <div className="right-container">
                    <div><b>{localStorage.getItem('username')}</b></div>
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