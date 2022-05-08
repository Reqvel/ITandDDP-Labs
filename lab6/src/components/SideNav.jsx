import '../css/base.css'
import { Link } from "react-router-dom"

const SideNav = ({ isShown }) => {
    return (
        <div className={isShown ? 'side-nav' : 'side-nav side-nav-hidden'}>
            <ul>
                <li>
                    <Link to="/" className="a text nav-text">About</Link>
                </li>
                <li>
                    <Link to="/" className="a text nav-text">Support</Link>
                </li>
                <li>
                    <Link to="/SignIn" className="a text nav-text">Sign In</Link>
                </li>
                <li>
                    <a href="https://www.spotify.com/us/signup" className="a text nav-text">Sign Up</a>
                </li>
            </ul>
        </div>
    )
}

export default SideNav;