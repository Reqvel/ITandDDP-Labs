import { useContext, useEffect, useState } from 'react'
import { TrackVisualsContext } from '../pages/PlayerPage'
import { getBgColors } from '../common/GetBgColors.js'

const BackgroundMp = () => {

    const { trackImgSrc } = useContext(TrackVisualsContext)
    const [background, setBackground] = useState("")

    function changeBackground(e) {
        const colors = getBgColors(e.target)
        var newBackground = 'linear-gradient(180deg,'
            newBackground += colors[0] + ' 0%,'
            newBackground += colors[1] + ' 30%,'
            newBackground += '#1C1C1C 100%)'
        setBackground(newBackground)
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = changeBackground

    useEffect( () => {
        if(trackImgSrc) img.src = trackImgSrc
    }, [trackImgSrc])

    return (
        <div className="gradient-background" style={{background: background}}></div>
    )
}

export default BackgroundMp