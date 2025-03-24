import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "../src/Assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import Home from "./Component/Pages/home";
import Signup from "./Component/Pages/signup";
import Subscription from "./Component/Pages/subscriptions";
import Ourteam from "./Component/Pages/ourteam";
import Pickdetail from "./Component/Pages/pickdetail";
import AllPicks from "./Component/Pages/allpicks";
import Signin from "./Component/Pages/signin";
import Header from "./Component/header";
import Checkout from "./Component/Pages/checkout";
import Data from "./Component/Pages/data";
import TeamDetails from "./Component/Pages/teamdetails"
// import Footer from "./Component/footer";

function Layout() {
  const location = useLocation(); // Get the current route

  // Hide header & footer on signup and signin pages
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Subscription />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/allpicks" element={<AllPicks />} />
          <Route path="/pickdetail" element={<Pickdetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/data" element={<Data />} />
          <Route path="/teamDetails" element={<TeamDetails />} />

        </Routes>
      </main>

      {/* {!hideHeaderFooter && <Footer />} */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
