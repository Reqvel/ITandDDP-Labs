import '../css/music-player.css'
import { nextItemsUrlKey, getTracksFromPlaylist } from '../API'
import { TracksContext, HeaderContext } from '../pages/PlaylistsPage'
import { Link } from "react-router-dom"
import { useContext } from 'react'

const PlaylistCard = ({ playlist }) => {
    const { tracks, setTracks } = useContext(TracksContext)
    const { header, setHeader } = useContext(HeaderContext)

    async function setPlaylistData(id, title) {
        const res = await getTracksFromPlaylist(id)
        setTracks(res[0])
        localStorage.setItem(nextItemsUrlKey, res[1])
        setHeader(title)
    }


    const id = playlist.id
    const imgSrc = playlist.images?.length > 0 ? playlist.images[0].url : '#'
    const title = playlist.name
    const description = playlist.description === "" 
                        ? 'Author: ' + playlist.owner.display_name 
                        : playlist.description

    return (
        <Link to="Tracks"
            key={id}
            className="a playlists-grid-item cursor-pointer"
            onClick={ () => {setPlaylistData(id, title)}}>
            <img src={imgSrc} className="playlist-img"/>
            <span className="text playlist-title">{title}</span>
            <span className="a text playlist-description" dangerouslySetInnerHTML={{ __html: description }}></span>
        </Link>
    )
}

export default PlaylistCard;