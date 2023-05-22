import React from "react";
import Navbar from "../Component/Navbar";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserQoute from "../Pages/UserQoute";
import RandomQoute from "../Pages/RandomQoute";
import SignUp from "../Pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "../Pages/Protected";




const Routing = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randomQoute" element={<RandomQoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/user' element={<Protected Comp={UserQoute} />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
       
      </Router>
    </div>
  );
};

export default Routing;
