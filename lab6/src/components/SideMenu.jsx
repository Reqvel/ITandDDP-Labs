import { ReactComponent as LinkIcon } from '../svgs/Link.svg'
import { Link } from "react-router-dom"
import { signOut } from '../actions/SignOut.js'
import '../css/music-player.css'
import '../css/base.css'

const SideMenu = ({ isShown, showHideSideMenu }) => {
    return (
        <aside className={isShown ? "side-menu" : "side-menu side-menu-hidden"}>
            <ul>
                <li>
                    <a id="account" 
                        className="a menu-opt-button text nav-text cursor-pointer" 
                        href="https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
                        onClick={showHideSideMenu}>Account</a>
                    <LinkIcon />
                </li>
                <li>
                    <Link to="/MusicPlayer/Playlists"
                            id="playlists" 
                            className="a menu-opt-button text nav-text cursor-pointer"
                            onClick={showHideSideMenu}>Playlists</Link>
                </li>
                <li>
                    <Link to="/MusicPlayer/Search"
                            id="search"
                            className="a enu-opt-button text nav-text cursor-pointer"
                            onClick={showHideSideMenu}>Search</Link>
                </li>
                <li>
                    <Link to="/" 
                        id="sign-out" 
                        className="a menu-opt-button text nav-text cursor-pointer"
                        onClick={() => {showHideSideMenu(); signOut(); }}>Sign Out</Link>
                </li>
            </ul>            
        </aside>
    )
}

export default SideMenu;