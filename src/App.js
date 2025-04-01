import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "../src/Assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import Newspage from "./Component/Pages/newspage"
import News from "./Component/Pages/news";
// import Footer from "./Component/footer";
// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

function Layout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, [location]);

  // Hide header & footer on signup and signin pages
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          } />
          <Route path="/ourteam" element={
            <ProtectedRoute>
              <Ourteam />
            </ProtectedRoute>
          } />
          <Route path="/allpicks" element={
            <ProtectedRoute>
              <AllPicks />
            </ProtectedRoute>
          } />
          <Route path="/pickdetail" element={
            <ProtectedRoute>
              <Pickdetail />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route path="/newspage" element={<Newspage />} />
          <Route path="/news" element={<News />} />

          
          
          {/* Redirect to signin for any unmatched routes */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </main>
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
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