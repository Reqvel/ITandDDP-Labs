import { Outlet } from 'react-router-dom'
import Backgroundfilter from './BackgroundFilter'

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