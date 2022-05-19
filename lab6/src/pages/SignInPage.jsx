import '../css/main-sign-in.css'
import '../css/base.css'
import BackgroundMain from "../components/BackgroundMain"
import Backgroundfilter from "../components/BackgroundFilter"
import Header from "../components/Header"
import SignIn from "../components/SignIn"

const SignInPage = () => {
    return (
        <>
            <BackgroundMain />
            <Backgroundfilter />
            <div className="body body-flexbox-column body-flexbox-column-100">
                <Header />
                <SignIn />
            </div>
        </>
    )
}

export default SignInPage;