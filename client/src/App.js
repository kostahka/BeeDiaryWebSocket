import {BrowserRouter, Route, Routes} from "react-router-dom";
import ApiaryList from "./pages/ApiaryList/ApiaryList";
import Apiary from "./pages/Apiary/Apiary";
import Hive from "./pages/Hive/Hive";
import Header from "./partial/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/apiaries" element={<ApiaryList/>}/>
              <Route path="/apiary/:id" element={<Apiary/>}/>
              <Route path="/apiary/hive/:id" element={<Hive/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
