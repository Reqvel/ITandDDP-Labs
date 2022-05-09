export function getArtistsNames(artists) {
    var names = ''
    for (const artist of artists) {
        names += artist.name
        names += ', '
    }
    if(names) {
        names = names.slice(0, -2);
    }
    return names
}