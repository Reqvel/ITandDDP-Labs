import '../css/main-home.css'

const MainHome = () => {
    return (
        <main className="main-home">
        <div className="side-menu side-menu-hidden">
            <ul>
                <li>
                    <a href="#" className="a text nav-text">About</a>
                </li>
                <li>
                    <a href="#" className="a text nav-text">Support</a>
                </li>
                <li>
                    <a href="../pages/SignIn.html" className="a text nav-text">Sign In</a>
                </li>
                <li>
                    <a href="https://www.spotify.com/us/signup" className="a text nav-text">Sign Up</a>
                </li>
            </ul>
        </div>
        <section className="main-home-section appear-animation">
            <h1 className="main-home-header cursor-default">
                Music for<br/> everyone.
            </h1>
            <p className="text main-home-paragraph cursor-default">
                A streaming service for all music fans.
            </p>
            <a href="../pages/SignIn.html" className="a text main-home-button">
                Get started
            </a>
        </section>
    </main>
    )
}

export default MainHome;