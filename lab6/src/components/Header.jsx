import '../css/base.css'
import { ReactComponent as MenuIcon } from '../svgs/MenuIcon.svg'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="header">
      <div className="side-menu-counter-block"></div>
      <nav>
          <ul className="header-ul header-ul-left">
              <li>
                  <a className="text nav-text cursor-pointer">About</a>
              </li>
              <li>
                  <a className="text nav-text cursor-pointer">Support</a>
              </li>
          </ul>
      </nav>
      <Link to="/" className="a text logo-text cursor-pointer">Spotifee</Link>
      <nav>
          <ul className="header-ul header-ul-right">
              <li>
                  <Link to="SignIn" className="a text nav-text cursor-pointer">Sign In</Link>
              </li>
              <li>
                  <a href="https://www.spotify.com/us/signup" className="a text nav-text">Sign Up</a>
              </li>
          </ul>
      </nav>
      <button className="menu-button menu-button-media cursor-pointer">
        <MenuIcon />
      </button>
    </div>
  )
}

export default Header;