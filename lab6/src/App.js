import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";


const App = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/SignIn" element={ <SignInPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;