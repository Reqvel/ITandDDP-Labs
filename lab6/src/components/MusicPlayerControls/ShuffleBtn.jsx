import { ReactComponent as Shuffle } from '../../svgs/Shuffle.svg'
import clsx from 'clsx';

const ShuffleBtn = ({ isShuffle, onClick }) => {
    return (
        <button className={ clsx({
            "controls-button controls-button-shuffle": true,
            "controls-button-selected": isShuffle
        }) } onClick={onClick}>
            <Shuffle />
        </button>
    )
}

export default ShuffleBtn;