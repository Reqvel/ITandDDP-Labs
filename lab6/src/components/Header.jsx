import '../css/base.css'
import SideNav from './SideNav';
import { Link } from "react-router-dom"
import { useState } from 'react';
import SideNavBtn from './SideNavBtn';

const Header = () => {
  const [isShown, setIsShown] = useState(false)
  const showHideSideNav = () => setIsShown(!isShown)

  return (
    <div className="header-container">
      <header className="header">
        <div className="side-nav-counter-block"></div>
        <nav>
            <ul className="header-ul header-ul-left">
                <li>
                    <Link to="/" className="a text nav-text">About</Link>
                </li>
                <li>
                    <Link to="/" className="a text nav-text">Support</Link>
                </li>
            </ul>
        </nav>
        <Link to="/" className="a text logo-text cursor-pointer">Spotifee</Link>
        <nav>
            <ul className="header-ul header-ul-right">
                <li>
                    <Link to="/SignIn" className="a text nav-text cursor-pointer">Sign In</Link>
                </li>
                <li>
                    <a href="https://www.spotify.com/us/signup" className="a text nav-text">Sign Up</a>
                </li>
            </ul>
        </nav>
        <SideNavBtn isShown={isShown} onClick={showHideSideNav}/>
      </header>
      <SideNav isShown={isShown}/>
    </div>
  )
}

export default Header;