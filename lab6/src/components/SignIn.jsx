import '../css/main-sign-in.css'
import '../css/base.css'
import SideNav from './SideNav';

const SignIn = () => {
    return (
        <main class="main-sign-in">
            <div class="main-sign-in-flex">
                <div class="main-sign-in-div appear-animation">
                    <h1 class="text main-sign-in-header cursor-default ">
                        Login with
                        <img src="/img/Spotify_logo_with_text.svg.png" class="spotify-img" />
                    </h1>
                    <button class="text input-button button-login cursor-pointer">Login</button>
                </div>
            </div>
        </main>
    )
}

export default SignIn;