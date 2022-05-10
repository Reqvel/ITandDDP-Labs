import { Outlet } from "react-router-dom";
import React, { useState } from "react";

export const TracksContext = React.createContext({
    tracks: [],
    setTracks: () => {}
})

export const HeaderContext = React.createContext({
    header: "",
    setHeader: () => {}
})

export const UriContext = React.createContext({
    contextUri: "",
    setContextUri: () => {}
})

const PlaylistsPage = () => {
    const [tracks, setTracks] = useState([])
    const [header, setHeader] = useState("")
    const [contextUri, setContextUri] = useState("")
    const tracksValue = { tracks, setTracks }
    const headerValue = { header, setHeader }
    const contextUriValue = { contextUri, setContextUri }

    return (
        <TracksContext.Provider value={tracksValue}>
            <HeaderContext.Provider value={headerValue}>
                <UriContext.Provider value={contextUriValue}>
                    <Outlet />
                </UriContext.Provider>
            </HeaderContext.Provider>
        </TracksContext.Provider >
    )
}

export default PlaylistsPage;