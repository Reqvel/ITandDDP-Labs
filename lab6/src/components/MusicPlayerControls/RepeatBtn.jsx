import { ReactComponent as Repeat } from '../../svgs/Repeat.svg'
import clsx from 'clsx';

const RepeatBtn = ({ repeatMode, onClick }) => {
    return (
        <button className={ clsx({
            "controls-button controls-button-repeat": true,
            "controls-button-selected": (repeatMode == 1 || repeatMode == 2)
        }) } onClick={onClick}>
            <Repeat />
        </button>
    )
}

export default RepeatBtn;