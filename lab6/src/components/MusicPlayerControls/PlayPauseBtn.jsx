import { ReactComponent as Pause } from '../../svgs/Pause.svg'
import { ReactComponent as Play } from '../../svgs/Play.svg'

const PlayPauseBtn = ({ isPaused, onClick }) => {
    return (
        <button className="controls-button controls-button-play-pause" onClick={onClick}>
            { isPaused ? <Play /> : <Pause /> }                                                           
        </button>
    )
}

export default PlayPauseBtn