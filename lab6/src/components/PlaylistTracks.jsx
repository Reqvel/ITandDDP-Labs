import { useContext } from "react";
import { TracksContext, HeaderContext } from "../pages/PlaylistsPage";
import { getTracksFromPlaylist, nextItemsUrlKey  } from "../API";
import { contentScrolled } from "../actions/ContentScroll";
import Tracks from "./Tracks";

const PlaylistTracks = () => {
    const { tracks, setTracks } = useContext(TracksContext)
    const { header, setHeader } = useContext(HeaderContext)

    async function getPlaylistTracks(nextUrl="") {
        const res = await getTracksFromPlaylist("", nextUrl)
        setTracks([...tracks, ...res[0]])
        localStorage.setItem(nextItemsUrlKey, res[1])
    }

    return (
        <>
            <h1 className="content-header text cursor-default">{ header }</h1>
            <div className="content-container" onScroll={ (e) => contentScrolled(e, getPlaylistTracks)}>
                {
                    tracks?.length > 0 ? ( <Tracks tracks={tracks} />) : (<></>)
                }
            </div>
        </>
    )
}

export default PlaylistTracks;