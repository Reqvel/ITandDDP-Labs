import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import PlayerPage from "./pages/PlayerPage";
import PrivateRoute from "./pages/PrivateRoute";
import PlaylistsPage from "./pages/PlaylistsPage";
import Playlists from "./components/Playlists";
import PlaylistTracks from "./components/PlaylistTracks";
import SearchPage from "./pages/SearchPage";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path="/SignIn" element={ <SignInPage /> } />
            <Route element={ <PrivateRoute /> }>
                <Route path="/MusicPlayer" element={ <PlayerPage /> }>
                    <Route path="Playlists" element={ <PlaylistsPage /> }>
                        <Route path="" element={ <Playlists /> } />
                        <Route path="Tracks" element={ <PlaylistTracks /> } />
                    </Route>
                    <Route path="Search" element={ <SearchPage /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default MyRoutes;