import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const TracksContext = React.createContext({
    tracks: [],
    setTracks: () => {}
})

export const HeaderContext = React.createContext({
    header: "",
    setHeader: () => {}
})

const PlaylistsPage = () => {
    const [tracks, setTracks] = useState([])
    const [header, setHeader] = useState("")
    const tracksValue = { tracks, setTracks }
    const headerValue = { header, setHeader }

    useEffect( () => {
        console.log(tracks)
    }, [tracks])

    return (
        <TracksContext.Provider value={tracksValue}>
            <HeaderContext.Provider value={headerValue}>
                <Outlet />
            </HeaderContext.Provider>
        </TracksContext.Provider >
    )
}

export default PlaylistsPage;