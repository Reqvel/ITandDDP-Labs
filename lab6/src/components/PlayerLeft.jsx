import '../css/music-player.css'
import '../css/base.css'
import { useContext } from 'react'
import { TrackImgSrcContext, 
        TrackTitleContext,
        TrackArtistsContext} from '../pages/PlayerPage'

const PlayerLeft = () => {

    const {trackImgSrc, setTrackImgSrc} = useContext(TrackImgSrcContext)
    const {trackTitle, setTrackTitle} = useContext(TrackTitleContext)
    const {trackArtists, setTrackArtists} = useContext(TrackArtistsContext)

    return (
        <div className="main-music-player-left-side">
            {
                trackImgSrc === ""
                ? <img className="track-img appear-animation"/>  
                : <img src={trackImgSrc}
                       className="track-img appear-animation"/>
            }
            <span className="text left-side-song-name cursor-default">{trackTitle}</span>
            <span className="text left-side-artist cursor-default">{trackArtists}</span>
        </div>
    )
}

export default PlayerLeft;