import { useState } from 'react';
import SideMenuBtn from "../components/SideMenuBtn";
import SideMenu from "../components/SideMenu";
import PlayerLeft from '../components/PlayerLeft';
import PlayerRight from '../components/PlayerRight';
import PlayerFooter from '../components/PlayerFooter';

const PlayerPage = () => {
    const [isShown, setIsShown] = useState(false)
    const showHideSideMenu = () => setIsShown(!isShown)

    return (
        <>
            <div className="gradient-background"></div>
            <div className="background-filter appear-animation appear-animation-500"></div>
            <div className="body-flexbox-column body-flexbox-column-100 appear-animation">
                <main className="main-music-player">
                    <SideMenu  isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                    <SideMenuBtn  isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                    <PlayerLeft />
                    <PlayerRight />
                </main>
                <PlayerFooter />
            </div>
        </>
    )
}

export default PlayerPage;