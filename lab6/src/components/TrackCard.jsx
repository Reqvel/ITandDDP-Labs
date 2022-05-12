import { getArtistsNames } from '../common/GetArtistsNames.js'
import { useContext } from 'react'
import { TrackVisualsContext, PlaybackStateContext } from '../pages/PlayerPage'
import { startResumePlayback } from "../API";

const TrackCard = ({ track, contextUri="" }) => {

    const {setTrackImgSrc, setTrackTitle, setTrackArtists} = useContext(TrackVisualsContext)
    const {setIsPaused, deviceId} = useContext(PlaybackStateContext)

    function setTrackVisuals(imgSrc, title, artistsNames) {
        setTrackImgSrc(imgSrc)
        setTrackTitle(title)
        setTrackArtists(artistsNames)
    }

    function togglePlayPause(id) {
        const trackUri = 'spotify:track:' + id
        startResumePlayback(trackUri, 0, contextUri, deviceId)
        setIsPaused(false)
    }


    const id = track.id
    const imgSrc = track.album.images?.length > 0 ? track.album.images[0].url : '#'
    const title = track.name
    const artistsNames = getArtistsNames(track.artists);

    return(
        <div id={id}
            className="tracks-list-item cursor-pointer"
            onClick={ () => { setTrackVisuals(imgSrc, title, artistsNames)
                            togglePlayPause(id) }}>
            <img src={imgSrc} className="tracks-list-item-img"/>
            <div className="tracks-list-item-info">
                <span className="text tracks-list-item-title">{title}</span>
                <span className="text tracks-list-item-artist">{artistsNames}</span>
            </div>
        </div>
    )
}

export default TrackCard;