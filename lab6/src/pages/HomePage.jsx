import BackgroundMain from "../components/BackgroundMain"
import Header from "../components/Header"
import Home from "../components/Home"

const HomePage = () => {
    return (
        <>
            <BackgroundMain />
            <div className="body body-flexbox-column body-flexbox-column-100">
                <Header />
                <Home />
            </div>
        </>
    )
}

export default HomePage;