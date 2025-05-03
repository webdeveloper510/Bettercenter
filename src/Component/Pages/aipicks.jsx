import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api';

const AIPicks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const checkLoginStatusAndSubscription = async () => {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("user_id");

      console.log("🚀 ~ userId:", userId);
      console.log("🚀 ~ token:", token);

      if (token && userId) {
        setIsLoggedIn(true);

        try {
          const data = await api.getSubscriptionStatus(userId);
          console.log("🚀 ~ Subscription API response:", data);
          setShowIframe(data.free_trial);
        } catch (error) {
          console.error("Failed to fetch subscription status:", error);
          setShowIframe(false);
        }
      } else {
        setIsLoggedIn(false);
        setShowIframe(false);
      }
    };

    checkLoginStatusAndSubscription();
  }, []);

  return (
    <section className="main">
      <div className="outer_custom">
        <h2 className="text-center our_team_head py-4 gap-3">Ai Picks</h2>
        <Container>
          {isLoggedIn && showIframe ? (
            <div className="row py-5 gap-3">
              <iframe
                src="https://betscienceai.shinyapps.io/sports-predictor/?mode=full"
                width="100%"
                height="800"
                style={{ border: 'none' }}
                title="Sports Predictor"
              />
            </div>
          ) : (
            <div className="text-center py-5">
           
              <Button variant="primary" onClick={() => window.location.href = '/pricing'}>
                Buy Now
              </Button>
            </div>
          )}
        </Container>
      </div>
    </section>
  );
};

export default AIPicks;
