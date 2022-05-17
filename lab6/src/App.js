import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <MyRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App;