import React from 'react';
import {BrowserRouter as  Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/landingpage.js'
import LoginPage from './page/loginpage.js'

import SignUPpage from './page/signuppage.js';
import Viewpage from './page/viewpage.js';

const App=()=> {

 
  
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUPpage />} />
                <Route path="/appheader" element={<Viewpage />} />
            </Routes>
        </Router>

  
  );
}

export default App;
