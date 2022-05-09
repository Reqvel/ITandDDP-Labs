import { useState, useEffect } from "react";
import Playlistcard from "../components/PlaylistCard";
import { contentScrolled } from "../actions/ContentScroll";
import { getUsername, 
        getCurrentPlaylists, 
        nextItemsUrlKey } from "../API";

const PlaylistsPage = () => {
    const [headerText, setHeaderText] = useState("");
    const [playlists, setPlaylists] = useState([]);
    
    async function getPlaylists(nextUrl="") {
        const res = await getCurrentPlaylists(nextUrl)
        setPlaylists([...playlists, ...res[0]])
        localStorage.setItem(nextItemsUrlKey, res[1])
    }

    useEffect( () => {
        async function getHeaderText() {
            const username =  await getUsername()
            if(username) setHeaderText( username + "'s Playlists" )
        }
        getHeaderText()
        getPlaylists()
    }, [])

    return (
        <>
            <h1 className="content-header text cursor-default">{ headerText }</h1>
            <div className="content-container-opt content-container-opt-hidden">
            </div>
            <div className="content-container" onScroll={ (e) => contentScrolled(e, getPlaylists)}>
                {
                    playlists?.length > 0
                    ? (
                        <div className="playlists-grid appear-animation">
                            { playlists.map( (playlist) => <Playlistcard playlist={playlist} /> ) }
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </>
    )
}

export default PlaylistsPage;