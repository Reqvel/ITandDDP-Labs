import '../css/music-player.css'
import '../css/base.css'
import '../css/progress-bar.css'
import PlayPauseBtn from './MusicPlayerControls/PlayPauseBtn'
import RepeatBtn from './MusicPlayerControls/RepeatBtn'
import PrevBtn from './MusicPlayerControls/PrevBtn'
import NextBtn from './MusicPlayerControls/NextBtn'
import ShuffleBtn from './MusicPlayerControls/ShuffleBtn'
import FavBtn from './MusicPlayerControls/FavBtn'
import { useContext, useEffect, useState } from 'react'
import { TrackVisualsContext, PlaybackStateContext} from '../pages/PlayerPage'
import { msToMinSec } from '../common/MsToMinSec.js'
import { getPlaybackState, pausePlayback, 
        startResumePlayback, togglePlaybackShuffle,
        setRepeatMode as setRepeatModeAPI,
        skipToNext, skipToPrevious,
        seekToPosition, setPlaybackVolume,
        checkUsersSavedTracks, removeTracks,
        saveTracks } from '../API'

const PlayerFooter = () => {

    const playbackSpeedMs = 1000
    const checkFavAndVolumeRateMs = 5000

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [volume, setVolume] = useState(30)
    const [timePlayed, setTimePlayed] = useState("0:00")
    const [timeLeft, setTimeLeft] = useState("0:00")
    const [visualPosition, setVisualPosition] = useState(0)
    const [isFav, setIsFav] = useState(false)

    const {trackImgSrc, trackTitle, trackArtists} = useContext(TrackVisualsContext)
    const {isPaused, setIsPaused,
            isShuffle, setIsShuffle,
            repeatMode, setRepeatMode,
            position, setPosition,
            duration, deviceId} = useContext(PlaybackStateContext)

    async function togglePlayPause() {
        const state = await getPlaybackState();
        if (state.is_playing) {
            pausePlayback()
            setIsPaused(true)
        }
        else {
            const contextUri = state.context ? state.context.uri : "";
            startResumePlayback(state.item.uri, state.progress_ms, contextUri, deviceId);
            setIsPaused(false)
        }
    }

    async function toggleShuffle() {
        const state = await getPlaybackState();
        if (state) {
            const shuffleState = state.shuffle_state;
            togglePlaybackShuffle(!shuffleState);
            setIsShuffle(!shuffleState)
        }
    }

    async function toggleRepeat() {
        const state = await getPlaybackState();
        if (state) {
            const offRepeatState = "off";
            const trackRepeatState = "track";
            const contextRepeatState = "context";
            const repeatState = state.repeat_state;
            if (repeatState === offRepeatState) {
                setRepeatModeAPI(trackRepeatState);
                setRepeatMode(2)
            }
            else if (repeatState === trackRepeatState || repeatState === contextRepeatState) {
                setRepeatModeAPI(offRepeatState);
                setRepeatMode(0)
            }
        }
    }

    async function toggleFav() {
        setIsFav(!isFav)
        const state = await getPlaybackState();
        if(state) {
            const id = state.item.id;
            const resArr = await checkUsersSavedTracks([id]);
            if(resArr) {
                const isSaved = resArr[0];
                isSaved ? removeTracks([id]) : saveTracks([id]);
            }
        }
    }

    async function checkFav() {
        const state = await getPlaybackState();
        if (state) {
            const id = state.item.id;
            const resArr = await checkUsersSavedTracks([id]);
            if(resArr) {
                const isSaved = resArr[0];
                setIsFav(isSaved)
            }
        }
    }

    useEffect( () => {
        const interval = setInterval( () => {
            if( !isPaused && position < duration) {
                const newPos = position +  playbackSpeedMs
                setTimePlayed(msToMinSec(newPos))
                setTimeLeft('-' + msToMinSec(duration - newPos))
                setPosition(newPos)
                if(!isMouseDown){
                    setVisualPosition(newPos)
                }
            } else {
                clearInterval(interval)
            }
        }, playbackSpeedMs )
        return () => clearInterval(interval)
    }, [position, isPaused, isMouseDown, duration])

    useEffect( () => {
        const interval = setInterval( checkFav, checkFavAndVolumeRateMs )
        return () => clearInterval(interval)
    }, [])

    // Move to Styles?
    const playbackBarStyle = {
        "--min": 0, 
        "--max": duration, 
        "--value": visualPosition
    }

    function playbackBarOnMouseDown() {
        setIsMouseDown(true)
    }

    function playbackBarOnMouseUp(e) {
        setIsMouseDown(false) 
        setPosition(e.target.value)
        seekToPosition(e.target.value)
    }

    function playbackBarOnChange(e) {
        e.target.style.setProperty('--value', e.target.value)
        setVisualPosition(e.target.value)
    }

    // Move to Styles?
    const volumeBarStyle = {
        "--min": 0, 
        "--max": 100, 
        "--value": volume
    }

    function volumeBarOnMouseUp(e) {
        setPlaybackVolume(e.target.value)
    }

    function volumeBarOnChange(e) {
        e.target.style.setProperty('--value', e.target.value)
        setVolume(e.target.value)
    }

    return (
        <div className="footer">
            <input type="range" 
                    className="progress-bar progress-bar-playback slider-progress" 
                    min="0" 
                    max={duration}
                    style={playbackBarStyle}
                    value={visualPosition}
                    onMouseDown={playbackBarOnMouseDown}
                    onMouseUp={playbackBarOnMouseUp}
                    onChange={playbackBarOnChange}
                    step={playbackSpeedMs} />
            <div className="under-progress-bar">
                <div className="text progress-time progress-time-played cursor-default">{timePlayed}</div>
                <div className="controls">
                    <div className="controls-left">
                            {
                                trackImgSrc === ""
                                ? <img className="track-img track-img-compact"/>  
                                : <img src={trackImgSrc}
                                    className="track-img track-img-compact"/>
                            }
                        <div className="controls-left-track-info">
                            <span className="text song-name-compact cursor-default">{trackTitle}</span>
                            <span className="text artist-compact cursor-default">{trackArtists}</span>
                        </div>
                    </div>
                    <div className="controls-center">
                        <ShuffleBtn isShuffle={isShuffle} onClick={toggleShuffle} />
                        <PrevBtn onClick={skipToPrevious}/>
                        <PlayPauseBtn isPaused={isPaused} onClick={togglePlayPause}/>
                        <NextBtn onClick={skipToNext}/>
                        <RepeatBtn repeatMode={repeatMode} onClick={toggleRepeat}/>
                    </div>
                    <div className="controls-right">
                        <FavBtn isFav={isFav} onClick={toggleFav} />
                        <input type="range" 
                                className="progress-bar progress-bar-volume slider-progress" 
                                min="0" 
                                max="100" 
                                style={volumeBarStyle}
                                value={volume}
                                onMouseUp={volumeBarOnMouseUp}
                                onChange={volumeBarOnChange}
                                step="1" />
                    </div>
                </div>
                <div className="text progress-time progress-time-left cursor-default">{timeLeft}</div>
            </div>
        </div>
    )
}

export default PlayerFooter;