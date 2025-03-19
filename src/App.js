import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../src/Assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Component/Pages/home';
import Signup from './Component/Pages/signup';
import Signin from './Component/Pages/signin';

function App() {
  return (
    <>
    <header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          
        </Routes>
      </Router>
      <footer/>
      </>
  );
}

export default App;