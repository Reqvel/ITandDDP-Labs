import '../css/base.css'
import { ReactComponent as MenuIcon } from '../svgs/MenuIcon.svg'

const Header = () => {
  return (
    <div className="header">
      <div className="side-menu-counter-block"></div>
      <nav>
          <ul className="header-ul header-ul-left">
              <li>
                  <button className="menu-button text nav-text cursor-pointer">About</button>
              </li>
              <li>
                  <button className="menu-button text nav-text cursor-pointer">Support</button>
              </li>
          </ul>
      </nav>
      <button className="menu-button text logo-text cursor-pointer">Spotifee</button>
      <nav>
          <ul className="header-ul header-ul-right">
              <li>
                  <button className="menu-button text nav-text cursor-pointer">Sign In</button>
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