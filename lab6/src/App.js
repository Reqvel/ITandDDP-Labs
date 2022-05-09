import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import PlayerPage from "./pages/PlayerPage";
import PrivateRoute from "./pages/PrivateRoute";
import PlaylistsPage from "./pages/PlaylistsPage";
import Playlists from "./components/Playlists";
import PlaylistTracks from "./components/PlaylistTracks";


const App = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/SignIn" element={ <SignInPage /> } />
          <Route path="/MusicPlayer" element={ <PrivateRoute /> }>
            <Route path="/MusicPlayer" element={ <PlayerPage /> }>
              <Route path="Playlists" element={ <PlaylistsPage /> }>
                <Route path="" element={ <Playlists /> } />
                <Route path="Tracks" element={ <PlaylistTracks /> } />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;