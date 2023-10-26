//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";


//PAGES
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/sign-up" element={<RegisterPage/>} />
      <Route path="/book/listing" element={<List/>} />
    </Routes>
  );
}

export default App;
