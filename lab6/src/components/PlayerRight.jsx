import Backgroundfilter from './BackgroundFilter'
import '../css/music-player.css'
import '../css/base.css'

const PlayerRight = () => {
    return (
        <div className="main-music-player-right-side">
            <Backgroundfilter />
            <div className="content">
                <h1 className="content-header text cursor-default">Welcome back!</h1>
                <div className="content-container-opt content-container-opt-hidden">

                </div>
                <div className="content-container">
                    
                </div>
            </div>
        </div>
    )
}

export default PlayerRight;