export function extractTracks(traksIn) {
    const tracksOut = []
    for (const trackIn of traksIn) {
        tracksOut.push(trackIn.track)
    }
    return tracksOut
}