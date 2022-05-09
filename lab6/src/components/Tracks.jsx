import TrackCard from "./TrackCard";

const Tracks = ({ tracks }) => {
    return (
        <div className="tracks-list appear-animation">
            { tracks.map( (track) => <TrackCard track={track} /> ) }
        </div>
    )
}

export default Tracks;