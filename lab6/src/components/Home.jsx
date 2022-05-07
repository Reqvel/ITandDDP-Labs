import '../css/main-home.css'
import SideNav from './SideNav';
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <main className="main-home">
            <SideNav />
            <section className="main-home-section appear-animation">
                <h1 className="main-home-header cursor-default">
                    Music for<br/> everyone.
                </h1>
                <p className="text main-home-paragraph cursor-default">
                    A streaming service for all music fans.
                </p>
                <Link to="/SignIn" className="a text main-home-button">
                    Get started
                </Link>
            </section>
        </main>
    )
}

export default Home;