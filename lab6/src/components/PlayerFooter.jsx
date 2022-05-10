import '../css/music-player.css'
import '../css/base.css'
import '../css/progress-bar.css'
import { ReactComponent as Repeat } from '../svgs/Repeat.svg'
import { ReactComponent as Previous } from '../svgs/Previous.svg'
import { ReactComponent as Pause } from '../svgs/Pause.svg'
import { ReactComponent as Play } from '../svgs/Play.svg'
import { ReactComponent as Next } from '../svgs/Next.svg'
import { ReactComponent as Shuffle } from '../svgs/Shuffle.svg'
import { ReactComponent as Heart } from '../svgs/Heart.svg'
import { useContext } from 'react'
import { TrackImgSrcContext, 
        TrackTitleContext,
        TrackArtistsContext} from '../pages/PlayerPage'

const PlayerFooter = () => {

    const {trackImgSrc, setTrackImgSrc} = useContext(TrackImgSrcContext)
    const {trackTitle, setTrackTitle} = useContext(TrackTitleContext)
    const {trackArtists, setTrackArtists} = useContext(TrackArtistsContext)

    return (
        <div className="footer">
            <input type="range" className="progress-bar progress-bar-playback slider-progress" min="0" max="1000" step="1000" value="0"/>
            <div className="under-progress-bar">
                <div className="text progress-time progress-time-played cursor-default">0:00</div>
                <div className="controls">
                    <div className="controls-left">
                        <img src={trackImgSrc}
                            className="track-img track-img-compact"/>
                        <div className="controls-left-track-info">
                            <span className="text song-name-compact cursor-default">{trackTitle}</span>
                            <span className="text artist-compact cursor-default">{trackArtists}</span>
                        </div>
                    </div>
                    <div className="controls-center">
                        <button className="controls-button controls-button-repeat">
                            <Repeat />
                        </button>
                        <button className="controls-button controls-button-prev">
                            <Previous />
                        </button>
                        <button className="controls-button controls-button-play-pause">
                            <Pause />
                            <Play />                                                            
                        </button>
                        <button className="controls-button controls-button-next">
                            <Next />
                        </button>
                        <button className="controls-button controls-button-shuffle">
                            <Shuffle />
                        </button>
                    </div>
                    <div className="controls-right">
                        <button className="controls-button controls-button-fav">
                            <Heart />
                        </button>
                        <input type="range" className="progress-bar progress-bar-volume slider-progress" min="0" max="100" step="1" value="30"/>
                    </div>
                </div>
                <div className="text progress-time progress-time-left cursor-default">0:00</div>
            </div>
        </div>
    )
}

export default PlayerFooter;