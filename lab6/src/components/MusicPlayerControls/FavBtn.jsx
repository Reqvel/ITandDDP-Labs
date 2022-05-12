import { ReactComponent as Heart } from '../../svgs/Heart.svg'
import clsx from 'clsx';

const FavBtn = ({ isFav, onClick }) => {
    return (
        <button className={ clsx({
            "controls-button controls-button-fav": true,
            "controls-button-selected": isFav
        }) } onClick={onClick}>
            <Heart />
        </button>
    )
}

export default FavBtn;