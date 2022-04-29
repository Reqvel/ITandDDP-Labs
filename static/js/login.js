import { loginUser, getHashParams, stateKey } from "./API.js"
import { accessTokenKey } from "./API.js"

// const redirectUrl = 'https://reqvel.github.io/ITandDDP-Labs/pages/MusicPlayer.html' // FOR DEPLOY
const redirectUrl = 'http://127.0.0.1:5500/pages/MusicPlayer.html' // FOR DEV

validateLogin();


function setEventListeners() {
    const loginBtn = document.querySelector(".button-login")

    loginBtn.addEventListener("click", loginUser, false)
}


function validateLogin() {
    const storedAccessToken = localStorage.getItem(accessTokenKey);
    if(storedAccessToken) {
        window.location.href = redirectUrl;
    }
    else {
        setEventListeners();
        const params = getHashParams();
        const accessToken = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

            if (accessToken && state == storedState) {
                localStorage.removeItem(stateKey);
                localStorage.setItem(accessTokenKey, accessToken);
                window.location.href = redirectUrl;
            }
            else if (accessToken && (state == null || state !== storedState)){
                alert('There was an error during the authentication');
            }
    }
}