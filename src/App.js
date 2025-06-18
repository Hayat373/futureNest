import React from 'react';
import {BrowserRouter as  Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/landingpage.js'
import LoginPage from './page/loginpage.js'

const App=()=> {

 
  
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>

  
  );
}

export default App;
