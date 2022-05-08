import SideMenu from "../components/SideMenu"

const PlayerPage = () => {
    return (
        <>
            <div className="gradient-background"></div>
            <div className="background-filter appear-animation appear-animation-500"></div>
            <div className="body-flexbox-column body-flexbox-column-100 appear-animation">
                <main className="main-music-player">
                    <SideMenu />
                    <div className="main-music-player-left-side">
                        <img className="track-img appear-animation"/>
                        <span className="text left-side-song-name cursor-default">Title</span>
                        <span className="text left-side-artist cursor-default">Artist</span>
                    </div>
                    <div className="main-music-player-right-side">
                        <div className="background-filter"></div>
                        <div className="content">
                            <h1 className="content-header text cursor-default">Welcome back!</h1>
                            <div className="content-container-opt content-container-opt-hidden">

                            </div>
                            <div className="content-container">
                                
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PlayerPage;