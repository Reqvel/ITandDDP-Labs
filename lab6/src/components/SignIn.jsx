import '../css/main-sign-in.css'
import '../css/base.css'
import { loginUser } from '../API'

const SignIn = () => {
    return (
        <main className="main-sign-in">
            <div className="main-sign-in-flex">
                <div className="main-sign-in-div appear-animation">
                    <h1 className="text main-sign-in-header cursor-default ">
                        Login with
                        <img src="/img/Spotify_logo_with_text.svg.png" className="spotify-img" />
                    </h1>
                    <button
                        onClick={loginUser}
                        className="text input-button button-login cursor-pointer">
                            Login
                    </button>
                </div>
            </div>
        </main>
    )
}

export default SignIn;