import TrackCard from "./TrackCard";

const Tracks = ({ tracks, contextUri="" }) => {
    return (
        <div className="tracks-list appear-animation">
            { tracks.map( (track) => <TrackCard key={track.id} 
                                                track={track} 
                                                contextUri={contextUri}/> ) }
        </div>
    )
}

export default Tracks;