import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../../Assets/css/aicontent.css"

const AIContent = () => {
  return (
    <section className="py-5 bg-blue">
      <Container>
        <h2 className="mb-4 text-center text-uppercase fw-bold">
          Transform Your Betting Strategy with BettorCenter AI
        </h2>
        <p className="lead text-center mb-5">
          Empower your wagers with our state-of-the-art AI Predictive Modeling Platform, designed by veteran data scientists and sports analysts to give you the inside track on every game.
        </p>

        <h4 className="mb-3">Why BettorCenter AI Stands Out</h4>

        <ol className="mb-5">
          <li>
            <strong>Unmatched Accuracy</strong>
            <ul>
              <li><strong>What It Is:</strong> A proprietary multi-model ensemble tuned across MLB, NFL, NBA, and NHL.</li>
              <li><strong>Why It Matters:</strong> Models consistently deliver a 7% average ROI—peaking at 15% in our top configurations—so you’re betting with statistically proven edge rather than gut feelings.</li>
            </ul>
          </li>
          <li>
            <strong>Always Fresh Insights</strong>
            <ul>
              <li><strong>What It Is:</strong> Continuous, market-adjusted forecasts that update every few hours.</li>
              <li><strong>Why It Matters:</strong> You’ll see early-morning line shifts and late-night adjustments in near-real time—keeping you aligned with sharp books and minimizing stale picks.</li>
            </ul>
          </li>
          <li>
            <strong>Tailored to Your Risk & Value Profile</strong>
            <ul>
              <li><strong>What It Is:</strong>
                <ul>
                  <li>Confidence Sorting (0–1 score)</li>
                  <li>EV Sorting (avg. profit per $1 wagered)</li>
                </ul>
              </li>
              <li><strong>Why It Matters:</strong> Easily spot bets with highest probability and greatest value to optimize bankroll allocation.</li>
            </ul>
          </li>
          <li>
            <strong>Actionable Analytics</strong>
            <ul>
              <li><strong>What It Is:</strong>
                <ul>
                  <li>Interactive trend charts & segmentation</li>
                  <li>Monthly profit calendars & win-loss audit trails</li>
                </ul>
              </li>
              <li><strong>Why It Matters:</strong> Spot trends & audit every pick to refine your long-term betting approach.</li>
            </ul>
          </li>
        </ol>

        <h4 className="mb-3">Seamless, Secure Access</h4>
        <ul className="mb-4">
          <li>
            <strong>Member Portal:</strong> Password-protected hub for all AI picks, handicapping packages, logs, and settings.
          </li>
          <li>
            <strong>Web Dashboard:</strong> Intuitive UI with exportable CSVs & filters by league, bet type, EV & confidence.
          </li>
          <li>
            <strong>Programmatic Integration:</strong> APIs & R/Python libraries for automated workflows in Excel or scripts.
          </li>
        </ul>

        <h4 className="mb-3">One Simple Plan</h4>
        <Card className="mb-5">
          <Card.Body>
            <Row>
              <Col md={4}><strong>Plan</strong></Col>
              <Col md={5}><strong>Features</strong></Col>
              <Col md={3}><strong>Price (Monthly)</strong></Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>All-Access</Col>
              <Col md={5}>
                Unlimited sports coverage (MLB, NFL, NBA, NHL), confidence & EV sorting, API & SDKs, full analytics suite
              </Col>
              <Col md={3}>$99</Col>
            </Row>
          </Card.Body>
        </Card>

        <h4 className="mb-3">How It Works</h4>
        <ul className="mb-5">
          <li>Subscribe at BettorCenter.com (3-day free trial included)</li>
          <li>Log in to your secured Member Portal</li>
          <li>Configure your leagues, confidence thresholds, and EV filters</li>
          <li>Deploy picks via web dashboard, API, or SDK</li>
          <li>Monitor performance in real-time with full pick audit trails</li>
        </ul>

        <h4 className="mb-3">Module Benefits Breakdown</h4>
        <ul className="mb-5">
          <li><strong>Accuracy Engine:</strong> Back bets with proven statistical edge using our multi-model AI ensemble.</li>
          <li><strong>Insight Pipeline:</strong> Forecasts stay aligned with market moves—never chase stale odds.</li>
          <li><strong>Risk & Value Manager:</strong> Sort by confidence or EV to allocate bankroll for best returns.</li>
          <li><strong>Analytics Dashboard:</strong> Spot patterns and verify performance with profit calendars and charts.</li>
          <li><strong>Secure Access Framework:</strong> Everything you need in one secure hub—no spreadsheets needed.</li>
          <li><strong>Integration Suite:</strong> Pull picks into Excel, R, or Python instantly with our API & SDK.</li>
        </ul>

        <h5 className="mb-3">User Testimonials</h5>
        <blockquote className="blockquote">
          <p>“BettorCenter AI gave me a consistent 7% ROI boost—exactly what I needed!”</p>
          <footer className="blockquote-footer">Casey M., All-Access Subscriber</footer>
        </blockquote>
        <blockquote className="blockquote">
          <p>“Sorting by EV helped me zero in on the bets with the highest profit potential—my bankroll is up 12% this month!”</p>
          <footer className="blockquote-footer">Alex J., Professional Bettor</footer>
        </blockquote>
        <blockquote className="blockquote mb-5">
          <p>“I’ve tried other services, but the clarity of the dashboards and ease of integration with my Excel sheets make BettorCenter AI unbeatable.”</p>
          <footer className="blockquote-footer">Maria S., Weekend Bettor</footer>
        </blockquote>

        <h5 className="text-center text-primary mb-3">Ready to Upgrade Your Edge?</h5>
        <p className="text-center lead">
          Don’t leave your bets to chance. Harness AI-driven insights, balance conviction with EV, and start maximizing returns today.
        </p>
        <div className="text-center mb-4">
          <a href="https://bettorcenter.com" className="btn btn-primary btn-lg">👉 Subscribe Now at BettorCenter.com</a>
        </div>
        <p className="text-center text-muted">
          Questions? Our support team is available Mon–Fri, 9 am–6 pm ET via live chat and email to help you configure, integrate, and optimize your strategy.
        </p>
        <h6 className="text-center text-secondary mt-4">
          Bet smarter. Bet with confidence. Bet with BettorCenter AI.
        </h6>
      </Container>
    </section>
  );
};

export default AIContent;
