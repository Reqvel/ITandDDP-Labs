import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import PlayerPage from "./pages/PlayerPage";
import PrivateRoute from "./pages/PrivateRoute";


const App = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/SignIn" element={ <SignInPage /> } />
          <Route path="/MusicPlayer" element={ <PrivateRoute /> }>
            <Route path="/MusicPlayer" element={ <PlayerPage /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;