import Header from "./components/Header"
import BackgroundMain from "./components/BackgroundMain"
import MainHome from "./components/Mainhome"


const App = () => {
  return (
    <div className="body body-flexbox-column">
    {/* <> */}
      <BackgroundMain />
      <Header />
      <MainHome />
    {/* </> */}
    </div>
  )
}

export default App;
