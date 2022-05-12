import { ReactComponent as Next } from '../../svgs/Next.svg'

const NextBtn = ({ onClick }) => {
    return (
        <button className="controls-button controls-button-next" onClick={onClick}>
            <Next />
        </button>
    )
}

export default NextBtn;