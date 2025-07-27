import React from 'react';
import {BrowserRouter as  Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/landingpage.js'
import LoginPage from './page/loginpage.js'

import SignUPpage from './page/signuppage.js';
import Viewpage from './page/viewpage.js';
import Updatepage from './page/updatepage.js';
import Sharepage from './page/sharepage.js';
import Detailpage from './page/detailpage.js';
import Createpage from './page/createpage.js';
import Detailview from './components/detail.js';

const App=()=> {

 
  
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUPpage />} />
                <Route path="/view" element={<Viewpage />} />
                <Route path="/update" element={<Updatepage />} />
                 <Route path="/share" element={<Sharepage />} />
                 <Route path="/detail" element={<Detailpage />} />
                <Route path="/create" element={<Createpage />} />
                 <Route path="/capsule/:capsuleId" element={<Detailview />} />
           
            </Routes>
        </Router>

  
  );
}

export default App;
