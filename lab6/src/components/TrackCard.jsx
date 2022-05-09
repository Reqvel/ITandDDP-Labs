import { getArtistsNames } from '../common/GetArtistsNames.js'

const TrackCard = ({ track }) => {

    const id = track.id
    const imgSrc = track.album.images?.length > 0 ? track.album.images[0].url : '#'
    const title = track.name
    const artistsNames = getArtistsNames(track.artists);

    return(
        <div key={id}
            className="tracks-list-item cursor-pointer">
          <img src={imgSrc} className="tracks-list-item-img"/>
          <div className="tracks-list-item-info">
              <span className="text tracks-list-item-title">{title}</span>
              <span className="text tracks-list-item-artist">{artistsNames}</span>
          </div>
      </div>
    )
}

export default TrackCard;