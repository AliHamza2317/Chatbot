import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './Login';
import RegisterPage from './Register';

import Chatbot from './Chatbot';
import History from './History';
function path() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/chat" element={<Chatbot/>}/>
        <Route path="/history" element={<History/>}/>
        
        <Route path="*" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default path