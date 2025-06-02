import React from 'react';
import { Container } from 'react-bootstrap';
import '../../Assets/css/staticcontent.css';

const StaticInfo = () => {
  return (
    <section className="odds-info-section py-5">
      <Container>
        <h5 className="section-title text-uppercase mb-3">
          Real-Time Odds Comparison with BettorCenter AI
        </h5>
        <p className="section-description mb-5">
          Stay ahead of the market by seeing every line from our roster of top legal sportsbooks—so you never miss the best price on your bets.
        </p>

        <h6 className="section-heading">Our Partners & Coverage</h6>
        <p className="section-description mb-4">
          We’ve teamed up with leading, licensed U.S. sportsbooks to deliver side-by-side odds for every major league and event, including:
        </p>
        <ul className="section-description mb-4">
          <li>NFL & College Football</li>
          <li>NBA & College Basketball</li>
          <li>MLB & NHL</li>
          <li>Global Soccer & More</li>
        </ul>
        <p className="section-description mb-4">
          Whether you’re hunting the sharpest moneyline, the juiciest spread, or an over/under edge, BettorCenter brings you the full spectrum of available odds in one place.
        </p>

        <h6 className="section-heading">Seamless Betslip Integration</h6>
        <p className="section-description mb-4">
          Build your ticket right in our web dashboard:
        </p>
        <ul className="section-description mb-4">
          <li><strong>Auto-Populate Best Odds:</strong> Add selections to your betslip and instantly see which sportsbook offers the top price.</li>
          <li><strong>One-Click Navigation:</strong> Jump straight to your chosen book to place the wager at peak value.</li>
        </ul>
        <p className="section-description mb-4">
          No manual line-shopping—our betslip does the heavy lifting so you can focus on strategy.
        </p>

        <h6 className="section-heading">Free Expert Picks & Insights</h6>
        <p className="section-description mb-4">
          Tap into our team of professional handicappers and in-house data scientists:
        </p>
        <ul className="section-description mb-4">
          <li><strong>Daily Free Picks & Parlays:</strong> Curated by our experts and updated throughout the season.</li>
          <li><strong>In-Depth Analysis:</strong> Staff-written breakdowns, trend reports, and matchup previews help you understand why a line moves.</li>
        </ul>
        <p className="section-description">
          All insights are delivered alongside our AI recommendations, giving you the best of both worlds.
        </p>
      </Container>
    </section>
  );
};

export default StaticInfo;
