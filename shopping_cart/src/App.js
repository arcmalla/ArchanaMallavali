import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/header';
import Login from './components/login'
import SignUp from "./components/signup";
import Home from "./components/home";
import Products from "./components/plp";
import Footer from "./components/footer";
import Cart from "./components/cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <ToastContainer/>
      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      <Footer/>

    </BrowserRouter>

  );
}

export default App;
