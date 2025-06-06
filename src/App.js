import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "../src/Assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Home from "./Component/Pages/home";
import Signup from "./Component/Pages/signup";
import Ourteam from "./Component/Pages/ourteam";
import Pickdetail from "./Component/Pages/pickdetail";
import AllPicks from "./Component/Pages/allpicks";
import Signin from "./Component/Pages/signin";
import Header from "./Component/header";
import CheckoutNew from "./Component/Pages/Checkout";
import Newspage from "./Component/Pages/newspage";
import News from "./Component/Pages/news";
import NFLGames from "./Component/Pages/newhome";
import Schedule from "./Component/Pages/Schedule";
import Games from "./Component/Pages/newhome";
import Futures from "./Component/Pages/futures";
import MatchesPage from "./Component/Pages/gameteamtab";
import BlogList from "./Component/Pages/blog";
import BlogDetail from "./Component/Pages/blogdetail";
import Cart from "./Component/Pages/cart";
import OrderConfirmation from "./Component/Pages/success";
import PromoBanner from "./Component/Pages/homebanner";
import AIPicks from "./Component/Pages/aipicks";
import GameSelector from "./Component/Pages/test";
import ManageSubscription from "./Component/Pages/msubscription";
import MProfile from "./Component/Pages/mprofile";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};
const OrderProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!location.state?.orderDetails) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function Layout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, [location]);

  const hideHeaderFooter =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          {/* Home as default route */}
          <Route path="/" element={<Games />} />

          <Route path="/ourteam" element={<Ourteam />} />

          {/* Updated routes with parameters */}
          <Route path="/allpicks" element={<AllPicks />} />
          <Route path="/allpicks/:adminId" element={<AllPicks />} />
          <Route path="/pickdetail" element={<Pickdetail />} />
          <Route path="/pickdetail" element={<Pickdetail />} />
          {/* <Route path="/aipicks" element={<AIPicks />} /> */}
          {/* <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } /> */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order-confirmation"
            element={
              <OrderProtectedRoute>
                <OrderConfirmation />
              </OrderProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/newhome" element={<NFLGames />} />
          <Route path="/Checkout" element={<CheckoutNew />} />
          <Route path="/newspage" element={<Newspage />} />
          <Route path="/news" element={<News />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/gameteamtab" element={<MatchesPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="PromoBanner" element={<homebanner />} />
          <Route path="GameSelector" element={<test />} />
          <Route path="/subscription" element={<ManageSubscription />} />
          <Route path="/profile" element={<MProfile />} />
          {/* <Route path="/teamstab" element={<Teamstab />} /> */}
          
          <Route
            path="AIPicks"
            element={
              <ProtectedRoute>
                <AIPicks />
              </ProtectedRoute>
            }
          />
          {/* Redirect to home for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
