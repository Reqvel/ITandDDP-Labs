import '../css/music-player.css'
import '../css/base.css'

const PlayerLeft = () => {
    return (
        <div className="main-music-player-left-side">
            <img className="track-img appear-animation"/>
            <span className="text left-side-song-name cursor-default">Title</span>
            <span className="text left-side-artist cursor-default">Artist</span>
        </div>
    )
}

export default PlayerLeft;