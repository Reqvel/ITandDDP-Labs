export function getArtistsNames(artists) {
    let names = ''
    for (const artist of artists) {
        names += artist.name
        names += ', '
    }
    if(names) {
        names = names.slice(0, -2);
    }
    return names
}