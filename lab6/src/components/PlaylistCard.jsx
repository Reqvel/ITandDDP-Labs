import '../css/music-player.css'
import { nextItemsUrlKey, getTracksFromPlaylist } from '../API'
import { TracksContext, HeaderContext, UriContext } from '../pages/PlaylistsPage'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { extractTracks } from '../common/ExtractTracks'

const PlaylistCard = ({ playlist }) => {
    const { tracks, setTracks } = useContext(TracksContext)
    const { header, setHeader } = useContext(HeaderContext)
    const { contextUri, setContextUri } = useContext(UriContext)

    async function setPlaylistData(id, title) {
        const res = await getTracksFromPlaylist(id)
        setTracks(extractTracks(res[0]))
        localStorage.setItem(nextItemsUrlKey, res[1])
        setHeader(title)

        const uri = 'spotify:playlist:' + id
        setContextUri(uri)
    }


    const id = playlist.id
    const imgSrc = playlist.images?.length > 0 ? playlist.images[0].url : '#'
    const title = playlist.name
    const description = playlist.description === "" 
                        ? 'Author: ' + playlist.owner.display_name 
                        : playlist.description

    return (
        <div className="a playlists-grid-item cursor-pointer"
            onClick={ () => {setPlaylistData(id, title)}}>
            <Link to="Tracks"
                className='a playlists-grid-item-container'>
                <img src={imgSrc} className="playlist-img"/>
                <span className="text playlist-title">{title}</span>
                <span className="a text playlist-description" dangerouslySetInnerHTML={{ __html: description }}></span>
            </Link>
        </div>
    )
}

export default PlaylistCard;