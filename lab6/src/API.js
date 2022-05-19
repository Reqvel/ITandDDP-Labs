export const stateKey = 'spotify_auth_state';
export const accessTokenKey = 'spotify_access_token';
export const nextItemsUrlKey = 'spotify_next_items_url';
export const nextItemsTypeKey = 'spotify_next_items_type';
export const itemTypeTrack = 'track';
export const itemTypePlaylists = 'playlists';
export const itemTypePlaylistItems = 'playlist items';


function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};


export function loginUser() {
    const clientId = 'c08f78ac1d1c44d687025fe762044f88';
    const redirectUri = 'http://localhost:3000/MusicPlayer'; // FOR DEV
    // const redirectUri = 'https://spotifee-99d72.web.app/MusicPlayer' // FOR DEPLOY

    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    let scope = 'user-read-private ';
        scope += 'user-read-email ';
        scope += 'user-library-modify ';
        scope += 'user-library-read ';
        scope += 'user-modify-playback-state ';
        scope += 'user-read-playback-state ';
        scope += 'playlist-read-private ';
        scope += 'streaming ';

    let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirectUri);
        url += '&state=' + encodeURIComponent(state);

    window.location = url;
}


async function getUserInfo() {
    const token = localStorage.getItem(accessTokenKey);
    if(token) {
        const url =  'https://api.spotify.com/v1/me';
        const options = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }   

        const response = await fetch(url, options);
        if (response.ok) {
            const res = await response.json();
            return res;
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


export function transferPlayback(deviceIds) {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player';
    const bodyOpt = { "device_ids": deviceIds }
    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body:  JSON.stringify(bodyOpt)
    }

    fetch(url, options);
}


export async function getCurrentPlaylists(nextUrl="") {
    const token = localStorage.getItem(accessTokenKey);
    const url = nextUrl ? nextUrl : 'https://api.spotify.com/v1/me/playlists'
    const options = {
        headers: {
            'Authorization': 'Bearer ' + token
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
    const token = localStorage.getItem(accessTokenKey);
    const url = nextUrl ? nextUrl : 'https://api.spotify.com/v1/playlists/' + id + '/tracks';
    const options = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const res = await response.json();
        const playlistId = res.href.substring(
            res.href.indexOf("playlists/") + "playlists/".length, 
            res.href.indexOf("/tracks")
        );
        return [res.items, res.next, itemTypePlaylistItems, playlistId]
    }
    return null;
}


export async function getPlaybackState() {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player';
    const options = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }   

    const response = await fetch(url, options);
    if (response.ok) {
        const res = await response.json();
        return res;
    }
    return null;
}


export function startResumePlayback(trackUri, progressMs=0, contextUri="", deviceId="") {
    const token = localStorage.getItem(accessTokenKey);

    let url = 'https://api.spotify.com/v1/me/player/play';
    if(deviceId){
        url += '?device_id=' + deviceId
    }

    let bodyOpt = { "position_ms": progressMs }
    if(contextUri) {
        bodyOpt["context_uri"] = contextUri 
        bodyOpt["offset"] = { "uri": trackUri }
    } else bodyOpt["uris"] = [trackUri]

    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(bodyOpt)
    }

    fetch(url, options);
}


export function pausePlayback() {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player/pause';
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function skipToNext() {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player/next';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function skipToPrevious() {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player/previous';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function setRepeatMode(state, deviceId="") {
    const token = localStorage.getItem(accessTokenKey);
    let url = 'https://api.spotify.com/v1/me/player/repeat?state=' + state;
    if(deviceId){
        url += '&device_id=' + deviceId
    }
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function togglePlaybackShuffle(state) {
    const token = localStorage.getItem(accessTokenKey);
    let url = 'https://api.spotify.com/v1/me/player/shuffle?state=' + state;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export async function checkUsersSavedTracks(ids) {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/tracks/contains?ids=' + ids.join(',');
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
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


export function saveTracks(ids) {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/tracks?ids=' + ids.join(',');
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function removeTracks(ids) {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/tracks?ids=' + ids.join(',');
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function setPlaybackVolume(volumePercent) {
    const token = localStorage.getItem(accessTokenKey);
    const url = 'https://api.spotify.com/v1/me/player/volume?volume_percent=' + volumePercent
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export function seekToPosition(positionMs) {
    const token = localStorage.getItem(accessTokenKey);
    const url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + positionMs
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }   

    fetch(url, options);
}


export async function searchForTracks(searchStr, nextUrl="") {
    const token = localStorage.getItem(accessTokenKey);

    let url = ""
    if(!nextUrl) {
        url = "https://api.spotify.com/v1/search?q="
        url += searchStr
        url += "&type=" + itemTypeTrack
    } else {
        url = nextUrl
    }
    
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
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