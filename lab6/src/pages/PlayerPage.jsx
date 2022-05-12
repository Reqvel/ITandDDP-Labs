import React, { useEffect, useState } from 'react';
import BackgroundMp from '../components/BackgroundMP';
import SideMenuBtn from "../components/SideMenuBtn";
import SideMenu from "../components/SideMenu";
import PlayerLeft from '../components/PlayerLeft';
import PlayerRight from '../components/PlayerRight';
import PlayerFooter from '../components/PlayerFooter';
import { Outlet, useNavigate } from 'react-router-dom';
import { accessTokenKey, transferPlayback } from '../API.js'
import { getArtistsNames } from '../common/GetArtistsNames.js'

export const TrackVisualsContext = React.createContext({
    trackImgSrc: "",
    setTrackImgSrc: () => {},
    trackTitle: "",
    setTrackTitle: () => {},
    trackArtists: "",
    setTrackArtists: () => {}
})

export const PlaybackStateContext = React.createContext({
    isPaused: true,
    setIsPaused: () => {},
    isShuffle: false,
    setIsShuffle: () => {},
    repeatMode: 0,
    setRepeatMode: () => {},
    position: 0,
    setPosition: () => {},
    duration: 0,
    setDuration: () => {},
    deviceId: "",
    setDeviceId: () => {},
})

const PlayerPage = () => {
    const navigate = useNavigate()

    const [isShown, setIsShown] = useState(false)
    const showHideSideMenu = () => setIsShown(!isShown)

    const [trackImgSrc, setTrackImgSrc] = useState("")
    const [trackTitle, setTrackTitle] = useState("Title")
    const [trackArtists, setTrackArtists] = useState("Artist")
    const [isPaused, setIsPaused] = useState(true)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const [deviceId, setDeviceId] = useState("")

    const trackVisualsValue = {trackImgSrc, setTrackImgSrc,
                            trackTitle, setTrackTitle,
                            trackArtists, setTrackArtists}
    const playbackStateValue = {isPaused, setIsPaused,
                            isShuffle, setIsShuffle,
                            repeatMode, setRepeatMode,
                            position, setPosition,
                            duration, setDuration,
                            deviceId, setDeviceId}

    const [player, setPlayer] = useState(undefined);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Spotifee Web Player',
                getOAuthToken: cb => { cb(localStorage.getItem(accessTokenKey)); },
                volume: 0.3
            });
    
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                // transferPlayback([device_id]) // Not always working 
                setDeviceId(device_id)
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
            player.addListener('player_state_changed', (state) => {
                if(state){
                    setTrackImgSrc(state.track_window.current_track.album?.images[0].url)
                    setTrackTitle(state.track_window.current_track.name)
                    setTrackArtists(getArtistsNames(state.track_window.current_track.artists))
                    setIsPaused(state.paused)
                    setIsShuffle(state.shuffle)
                    setRepeatMode(state.repeat_mode)
                    setPosition(state.position)
                    setDuration(state.track_window.current_track.duration_ms)
                }
            });
    
            player.connect();
        }
        return () => player.disconnect();
    }, []);

    useEffect( () => {
        if(player) navigate('Search')
    }, [player])

    return (
        <>
            <TrackVisualsContext.Provider value={trackVisualsValue}>
                <BackgroundMp />
                <div className="background-filter appear-animation appear-animation-500"></div>
                <div className="body-flexbox-column body-flexbox-column-100 appear-animation">
                    <PlaybackStateContext.Provider value={playbackStateValue}>
                        <main className="main-music-player">
                            <SideMenu isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                            <SideMenuBtn isShown={isShown} showHideSideMenu={showHideSideMenu}/>
                            <PlayerLeft />
                            <PlayerRight>
                                <Outlet />
                            </PlayerRight>
                        </main>
                        <PlayerFooter />
                    </PlaybackStateContext.Provider>
                </div>
            </TrackVisualsContext.Provider>
        </>
    )
}

export default PlayerPage;