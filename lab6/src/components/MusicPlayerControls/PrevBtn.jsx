import { ReactComponent as Previous } from '../../svgs/Previous.svg'

const PrevBtn = ({ onClick }) => {
    return (
        <button className="controls-button controls-button-prev" onClick={onClick}>
            <Previous />
        </button>
    )
}

export default PrevBtn;