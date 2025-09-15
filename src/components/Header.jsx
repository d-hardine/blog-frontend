import { Link } from 'react-router'
import './Header.css'

function Header() {
    return (
        <header>
            <div className="left-container">
                <Link to="/">Home</Link>
            </div>
            <div className="right-container">
                <Link to="Signup">Signup</Link>
            </div>
        </header>
    )
}

export default Header