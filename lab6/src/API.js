export const stateKey = 'spotify_auth_state';
export const accessTokenKey = 'spotify_access_token';
export const nextItemsUrlKey = 'spotify_next_items_url';
export const nextItemsTypeKey = 'spotify_next_items_type';
export const itemTypeTrack = 'track';
export const itemTypePlaylists = 'playlists';
export const itemTypePlaylistItems = 'playlist items';


function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};


export function loginUser() {
    const clientId = 'c08f78ac1d1c44d687025fe762044f88';
    const redirectUri = 'http://localhost:3000/MusicPlayer'; // FOR DEV

    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    var scope = 'user-read-private ';
        scope += 'user-read-email ';
        scope += 'user-library-modify ';
        scope += 'user-library-read ';
        scope += 'user-modify-playback-state ';
        scope += 'playlist-read-private ';
        scope += 'streaming ';

    var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirectUri);
        url += '&state=' + encodeURIComponent(state);

    window.location = url;
}


async function getUserInfo() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    if(storedAccessToken) {
        const url =  'https://api.spotify.com/v1/me';
        const options = {
            headers: {
                'Authorization': 'Bearer ' + storedAccessToken
            }
        }   

        const response = await fetch(url, options);
        if(response.status == 401) alert("Please sign out and login again")
        const json = await response.json();
        if (response.ok) {
            return json;
        }
    }
    return null;
}


export async function getUsername() {
    const userInfo = await getUserInfo();
    if(userInfo) {
        return userInfo.display_name
    }
    return null;
}


export async function transferPlayback(device_ids) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player';
    var bodyOpt = { "device_ids": device_ids }
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(bodyOpt)
    }

    const response = await fetch(url, options);
    if(response.ok) console.log("Playback transferred")
}


export async function getCurrentlyPlayingTrack() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/currently-playing';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, options);
}


export async function getCurrentPlaylists(nextUrl="") {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = nextUrl ? nextUrl : 'https://api.spotify.com/v1/me/playlists'
    const options = {
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken
        }
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const res = await response.json();
        return [res.items, res.next, itemTypePlaylists]
    }
    return null;
}


export async function getTracksFromPlaylist(id, nextUrl="") {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
        var url = nextUrl ? nextUrl : 'https://api.spotify.com/v1/playlists/' + id + '/tracks';
        const options = {
            headers: {
                'Authorization': 'Bearer ' + storedAccessToken
            }
        }   

        const response = await fetch(url, options);
        if (response.ok) {
            const res = await response.json();
            var playlistId = res.href.substring(
                res.href.indexOf("playlists/") + "playlists/".length, 
                res.href.indexOf("/tracks")
            );
            return [res.items, res.next, itemTypePlaylistItems, playlistId]
        }
    return null;
}


export async function getPlaybackState() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player';
    const options = {
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        },
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json();
        return json;
    }
    return null;
}


export async function startResumePlayback(trackUri, progressMs=0, contextUri="", deviceId="") {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/play';
    if(deviceId){
        url += '?device_id=' + deviceId
    }
    var bodyOpt = { "position_ms": progressMs }
    if(contextUri) {
        bodyOpt["context_uri"] = contextUri 
        bodyOpt["offset"] = { "uri": trackUri }
    } 
    else bodyOpt["uris"] = [trackUri]
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(bodyOpt)
    }

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json)
    if(response.status == 404) alert("Please connect to the Spotifee Web Player using Spotify Web Player or Spotify App")
}


export async function pausePlayback() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/pause';
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function skipToNext() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/next';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function skipToPrevious() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/previous';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function setRepeatMode(state) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/repeat?state=' + state;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function togglePlaybackShuffle(state) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/shuffle?state=' + state;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function checkUsersSavedTracks(ids) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/tracks/contains?ids=' + ids.join(',');
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const resArr = await response.json();
        return resArr;
    }
    return null;
}


export async function saveTracks(ids) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/tracks?ids=' + ids.join(',');
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function removeTracks(ids) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/tracks?ids=' + ids.join(',');
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function setPlaybackVolume(volumePercent) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = 'https://api.spotify.com/v1/me/player/volume?volume_percent=' + volumePercent
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function seekToPosition(positionMs) {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + positionMs
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
}


export async function searchForTracks(searchStr, nextUrl="") {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    var url = ""
    if(!nextUrl) {
        url = "https://api.spotify.com/v1/search?q="
        url += searchStr
        url += "&type=" + itemTypeTrack
    }
    else {
        url = nextUrl
    }
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + storedAccessToken,
            'Content-Type': 'application/json'
        }
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const res = await response.json();
        return [res.tracks.items, res.tracks.next, itemTypeTrack]
    }
    return null
}