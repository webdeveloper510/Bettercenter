import React from 'react';
import { Container } from 'react-bootstrap';
import '../../Assets/css/staticcontent.css';

const StaticInfo = () => {
  return (
    <section className="odds-info-section py-5">
      <Container>
        <h5 className="section-title text-uppercase mb-3">
          Betting Odds Comparison – OddsChecker US
        </h5>
        <p className="section-description mb-5">
          Launched in 1999 in the UK, oddschecker is now a leading betting odds comparison site serving millions of users globally.
          With the legalization of sports betting in the United States, oddschecker provides industry-leading picks and insights,
          AI-powered tools, and education to help you be the best bettor you can be.
        </p>

        <h6 className="section-heading">The Original Odds Comparison Site</h6>
        <p className="section-description mb-4">
          We partner with the best legal sportsbooks in the industry, giving our users access to real-time odds comparison across a huge range of US and global sports,
          including: NFL Odds, College Football Odds, NBA Odds, College Basketball Odds, WNBA Odds, NHL Odds, MLB Odds, and Global Soccer Odds. Our integrated betslip technology
          tracks your best selections & automatically displays the sportsbook(s) with the best odds for your selections, making it simple for you to place those bets when the time comes.
          If you prefer to bet with a chosen sportsbook – you can access those odds from the betslip tool. If you are new to the site or just need a helping hand – we created a handy guide
          on how to place a bet on oddschecker.
        </p>

        <h6 className="section-heading">Free Betting Picks & Insights</h6>
        <p className="section-description mb-4">
          Our expert handicappers provide a multitude of free picks & parlays throughout the sporting calendar & our team of staff writers also provide you with the latest odds-focused
          insights across a vast range of popular sports to help you try and place that winning bet.
        </p>

        <h6 className="section-heading">The Latest Sportsbook and Casino Promotions</h6>
        <p className="section-description">
          Whether you're new to sports betting or online casinos, or simply looking to access multiple platforms for the best odds and bonuses, then you should visit our sportsbook promotions
          and casino promotions pages – where the very latest signup offers are available to claim in your state.
        </p>
      </Container>
    </section>
  );
};

export default StaticInfo;
