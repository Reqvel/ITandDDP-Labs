import { Navigate, Outlet } from 'react-router-dom'
import { accessTokenKey, stateKey } from "../API.js"

export function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    
    return hashParams;
}

function validateLogin() {
    const storedToken = localStorage.getItem(accessTokenKey);
    if(storedToken) {
        return true
    }
    else {
        const params = getHashParams();
        const token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

        if (token && state === storedState) {
            localStorage.removeItem(stateKey);
            localStorage.setItem(accessTokenKey, token);
            return true
        }
        else if (token && (state == null || state !== storedState)){
            alert('There was an error during the authentication');
            return false
        }
    }
    return false
}

function PrivateRoute() {
    const token = validateLogin()
    return token ?
        <Outlet/> :
        <Navigate to="/SignIn"/>;
}

export default PrivateRoute;