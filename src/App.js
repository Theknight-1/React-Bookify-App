//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";


//PAGES
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import BookDetail from "./pages/Detail";
import ViewOrder from "./pages/ViewOrder";
import ViewOrderDetail from "./pages/ViewOrderDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/sign-up" element={<RegisterPage/>} />
      <Route path="/book/listing" element={<List/>} />
      <Route path="book/view/:bookID" element={<BookDetail/>} />
      <Route path="book/orders" element={<ViewOrder/>} />
      <Route path="books/orders/:bookId" exact element={<ViewOrderDetail/>} />
    </Routes>
  );
}

export default App;
