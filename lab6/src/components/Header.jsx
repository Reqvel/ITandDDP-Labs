import '../css/base.css'
import SideNav from './SideNav';
import { ReactComponent as MenuIcon } from '../svgs/MenuIcon.svg'
import { Link } from "react-router-dom"
import { useState } from 'react';

const Header = () => {
  const [isShown, setIsShown] = useState(false)
  const showHideSideNav = () => setIsShown(!isShown)

  return (
    <div>
      <div className="header">
        <div className="side-menu-counter-block"></div>
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
        <button 
          className={isShown ? "menu-button menu-button-media cursor-pointer menu-button-selected" : "menu-button menu-button-media cursor-pointer"}
          onClick={showHideSideNav}>
          <MenuIcon />
        </button>
      </div>
      <SideNav isShown={isShown}/>
    </div>
  )
}

export default Header;