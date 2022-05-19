import { useState } from 'react';
import { Link } from "react-router-dom"
import SideNav from './SideNav';
import SideNavBtn from './SideNavBtn';
import ListItemLink from './ListItemLink';

const Header = () => {
  const [isShown, setIsShown] = useState(false)
  const showHideSideNav = () => setIsShown(!isShown)

  return (
    <div className="header-container">
      <header className="header">
        <div className="side-nav-counter-block"></div>
        <nav>
            <ul className="header-ul header-ul-left">
              <ListItemLink to={"/"} text={"About"}/>
              <ListItemLink to={"/"} text={"Support"}/>
            </ul>
        </nav>
        <Link to="/" className="a text logo-text cursor-pointer">Spotifee</Link>
        <nav>
            <ul className="header-ul header-ul-right">
              <ListItemLink to={"/SignIn"} text={"Sign In"}/>
              <ListItemLink to={"https://www.spotify.com/us/signup"} 
                          text={"Sign Up"} 
                          isExternal={true}/>
            </ul>
        </nav>
        <SideNavBtn isShown={isShown} onClick={showHideSideNav}/>
      </header>
      <SideNav isShown={isShown}/>
    </div>
  )
}

export default Header;