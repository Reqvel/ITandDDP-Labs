import React, { useEffect, useState } from 'react';
import BackgroundMp from '../components/BackgroundMP';
import SideMenuBtn from "../components/SideMenuBtn";
import SideMenu from "../components/SideMenu";
import PlayerLeft from '../components/PlayerLeft';
import PlayerRight from '../components/PlayerRight';
import PlayerFooter from '../components/PlayerFooter';
import { Outlet } from 'react-router-dom';

export const TrackImgSrcContext = React.createContext({
    trackImgSrc: "",
    setTrackImgSrc: () => {}
})

export const TrackTitleContext = React.createContext({
    trackTitle: "",
    setTrackTitle: () => {}
})

export const TrackArtistsContext = React.createContext({
    trackArtists: "",
    setTrackArtists: () => {}
})

const PlayerPage = () => {
    const [isShown, setIsShown] = useState(false)
    const showHideSideMenu = () => setIsShown(!isShown)

    const [trackImgSrc, setTrackImgSrc] = useState("")
    const [trackTitle, setTrackTitle] = useState("Title")
    const [trackArtists, setTrackArtists] = useState("Artist")

    const trackImgSrcValue = {trackImgSrc, setTrackImgSrc}
    const trackTitleValue = {trackTitle, setTrackTitle}
    const trackArtistsValue = {trackArtists, setTrackArtists}

    return (
        <>
            <TrackImgSrcContext.Provider value={trackImgSrcValue}>
                <TrackTitleContext.Provider value={trackTitleValue}>
                    <TrackArtistsContext.Provider value={trackArtistsValue}>
                        <BackgroundMp />
                        <div className="background-filter appear-animation appear-animation-500"></div>
                        <div className="body-flexbox-column body-flexbox-column-100 appear-animation">
                            <main className="main-music-player">
                                <SideMenu  isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                                <SideMenuBtn  isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                                <PlayerLeft />
                                <PlayerRight>
                                    <Outlet />
                                </PlayerRight>
                            </main>
                            <PlayerFooter />
                        </div>
                    </TrackArtistsContext.Provider >
                </TrackTitleContext.Provider>
            </TrackImgSrcContext.Provider>
        </>
    )
}

export default PlayerPage;