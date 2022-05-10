import { getArtistsNames } from '../common/GetArtistsNames.js'
import { useContext } from 'react'
import { TrackImgSrcContext, 
        TrackTitleContext,
        TrackArtistsContext} from '../pages/PlayerPage'

const TrackCard = ({ track, contextUri="" }) => {

    const {trackImgSrc, setTrackImgSrc} = useContext(TrackImgSrcContext)
    const {trackTitle, setTrackTitle} = useContext(TrackTitleContext)
    const {trackArtists, setTrackArtists} = useContext(TrackArtistsContext)

    function setTrackVisuals(imgSrc, title, artistsNames) {
        setTrackImgSrc(imgSrc)
        setTrackTitle(title)
        setTrackArtists(artistsNames)
    }

    const id = track.id
    const imgSrc = track.album.images?.length > 0 ? track.album.images[0].url : '#'
    const title = track.name
    const artistsNames = getArtistsNames(track.artists);

    return(
        <div id={id}
            className="tracks-list-item cursor-pointer"
            onClick={ () => { setTrackVisuals(imgSrc, title, artistsNames) }}>
            <img src={imgSrc} className="tracks-list-item-img"/>
            <div className="tracks-list-item-info">
                <span className="text tracks-list-item-title">{title}</span>
                <span className="text tracks-list-item-artist">{artistsNames}</span>
            </div>
        </div>
    )
}

export default TrackCard;