import Backgroundfilter from './BackgroundFilter'
import '../css/music-player.css'
import '../css/base.css'
import { Outlet } from 'react-router-dom'

const PlayerRight = () => {
    return (
        <div className="main-music-player-right-side">
            <Backgroundfilter />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default PlayerRight;