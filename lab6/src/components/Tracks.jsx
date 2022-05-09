import TrackCard from "./TrackCard";

const Tracks = ({ tracks }) => {
    return (
        <div className="tracks-list appear-animation">
            { tracks.map( (trackInfo) => <TrackCard track={trackInfo.track} /> ) }
        </div>
    )
}

export default Tracks;