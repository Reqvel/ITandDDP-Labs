import { ReactComponent as LinkIcon } from '../svgs/Link.svg'
import { signOut } from '../actions/SignOut.js'
import ListItemLink from './ListItemLink'

const SideMenu = ({ isShown, showHideSideMenu, signOutOnClick }) => {
    return (
        <aside className={isShown ? "side-menu" : "side-menu side-menu-hidden"}>
            <ul>
                <li>
                    <a className="a text nav-text" 
                       href="https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
                       onClick={showHideSideMenu}>Account</a>
                    <LinkIcon />
                </li>
                <ListItemLink to={"/MusicPlayer/Playlists"} text={"Playlists"} onClick={showHideSideMenu} />
                <ListItemLink to={"/MusicPlayer/Search"} text={"Search"} onClick={showHideSideMenu} />
                <ListItemLink to={"/"} text={"Sign Out"} onClick={() => {showHideSideMenu(); signOut(); }} />
            </ul>            
        </aside>
    )
}

export default SideMenu;