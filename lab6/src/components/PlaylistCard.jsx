import '../css/music-player.css'

const Playlistcard = ({ playlist }) => {
    const id = playlist.id
    const imgSrc = playlist.images.length > 0 ? playlist.images[0].url : '#'
    const title = playlist.name
    const description = playlist.description === "" 
                        ? 'Author: ' + playlist.owner.display_name 
                        : playlist.description

    return (
        <div id={id} className="playlists-grid-item cursor-pointer">
            <img src={imgSrc} className="playlist-img"/>
            <span className="text playlist-title">{title}</span>
            <span className="a text playlist-description" dangerouslySetInnerHTML={{ __html: description }}></span>
        </div>
    )
}

export default Playlistcard;