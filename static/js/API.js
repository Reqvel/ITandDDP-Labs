export const stateKey = 'spotify_auth_state';
export const accessTokenKey = 'spotify_access_token';


function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};


export function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    
    return hashParams;
}


export function loginUser() {
    const clientId = 'c08f78ac1d1c44d687025fe762044f88';
    const redirectUri = 'http://127.0.0.1:5500/pages/SignIn.html'; // TO CHANGE

    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    const scope = 'user-read-private user-read-email playlist-read-private'; // TO CHANGE

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
        if (response.ok) {
            return await response.json();
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


export async function getCurrentPlaylists() {
    const userInfo = await getUserInfo();
    if(userInfo) {
        const storedAccessToken = localStorage.getItem(accessTokenKey);
        const userId = userInfo.id
        // var url = 'https://api.spotify.com/v1/users/';
        //     url += userId;
        //     url += '/playlists';
        var url = 'https://api.spotify.com/v1/me/playlists' // TODO
        const options = {
            headers: {
                'Authorization': 'Bearer ' + storedAccessToken
            }
        }   

        const response = await fetch(url, options);
        if (response.ok) {
            const json = await response.json();
            return json.items
        }
    }
    return null;
}