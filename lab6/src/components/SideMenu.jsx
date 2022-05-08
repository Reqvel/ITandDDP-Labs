import { ReactComponent as MenuIconM } from '../svgs/MenuIconM.svg'
import { ReactComponent as LinkIcon } from '../svgs/Link.svg'
import { Link } from "react-router-dom"
import { useState } from 'react';
import { signOut } from '../actions/SignOut.js'
import '../css/music-player.css'
import '../css/base.css'

const SideMenu = () => {
    const [isShown, setIsShown] = useState(false)
    const showHideSideMenu = () => setIsShown(!isShown)

    return (
        <>
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
                        <button id="playlists" 
                                className="menu-opt-button text nav-text cursor-pointer"
                                onClick={showHideSideMenu}>Playlists</button>
                    </li>
                    <li>
                        <button id="search"
                                className="menu-opt-button text nav-text cursor-pointer"
                                onClick={showHideSideMenu}>Search</button>
                    </li>
                    <li>
                        <Link to="/" 
                            id="sign-out" 
                            className="a menu-opt-button text nav-text cursor-pointer"
                            onClick={() => {showHideSideMenu(); signOut(); }}>Sign Out</Link>
                    </li>
                </ul>            
            </aside>
            <button className={isShown ? 
                                "menu-button menu-button-mp cursor-pointer menu-button-selected" :
                                "menu-button menu-button-mp cursor-pointer"}
                    onClick={showHideSideMenu}>
                <MenuIconM />
            </button>
        </>
    )
}

export default SideMenu;