import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/Assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import Home from "./Component/Pages/home";
import Signup from "./Component/Pages/signup";
import Subscription from "./Component/Pages/subscriptions";
import Signin from "./Component/Pages/signin";
import Header from "./Component/header"; // Create a Header component
import Footer from "./Component/footer"; // Create a Footer component

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscriptions" element={<Subscription />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
