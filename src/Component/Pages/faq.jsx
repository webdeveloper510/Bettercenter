import React from "react";
import { Container, Accordion } from "react-bootstrap";

const Faq = () => {
const faqList = [
  {
    question: "What sports and bet types does BettorCenter AI cover?",
    answer: "BettorCenter AI provides predictions across MLB, NFL, NBA, and NHL, including moneylines, point spreads, and totals—all included in the single $99/month All-Access plan."
  },
  {
    question: "How often are predictions updated?",
    answer: "Our models run on a rolling schedule, refreshing market-adjusted forecasts every few hours so you always have the freshest edge."
  },
  {
    question: "How do I interpret confidence thresholds?",
    answer: "Each pick has a “confidence score” (0–1). In your Member Portal you can sort picks by score (e.g. highest first) to focus on the strongest recommendations while still seeing every pick."
  },
  {
    question: "What is Expected Value (EV) and how do you use it?",
    answer: "Every pick shows an EV figure (average profit per $1 wagered). In your portal you can sort by EV to prioritize the highest-potential bets and combine EV with confidence scores for risk-adjusted decisions."
  },
  {
    question: "How is transparency ensured for every pick?",
    answer: "Each recommendation is fully tracked with date, event details, confidence score, and EV. You can audit every pick in your portal’s history—exportable by game or date—so you know exactly how each prediction performed over time."
  },
  {
    question: "How can I export or integrate the data?",
    answer: "• Export CSVs & dynamic tables directly from the web dashboard\n• Programmatic integration via simple API endpoints or our R/Python client libraries"
  },
  {
    question: "Can I customize which games or bet types I see?",
    answer: "Yes—you can filter by league (MLB, NFL, NBA, NHL) and by bet type (moneyline, spread, totals) so the interface only shows what you care about."
  },
  {
    question: "Do you offer a free trial or money-back guarantee?",
    answer: "We offer a 3-day free trial with full All-Access functionality. Cancel at any time via your account settings; billing stops immediately."
  },
  {
    question: "What support do you provide?",
    answer: "Our support team is available during business hours (Mon–Fri, 9 am–6 pm ET) via live chat and email for help with thresholds, API calls, data exports, handicapping packages, or any other questions."
  },
  {
    question: "Who are the Professional Handicappers and how do their packages work?",
    answer: "We partner with vetted, expert handicappers who offer their own curated pick packages (e.g. “NBA Premium,” “NFL Game-Day”). Each package is an add-on purchase—handicapper picks are delivered through the same secure portal alongside your AI picks."
  },
  {
    question: "How do I purchase a handicapping package?",
    answer: "Inside your Member Portal, navigate to Handicappers → Browse Packages, select the package you want, and complete your purchase. Once purchased, those picks appear in your dashboard and exports just like AI picks."
  },
  {
    question: "How do I update my payment or billing information?",
    answer: "Log into Account Settings → Billing in your Member Portal to add, update, or remove credit cards. All payments are processed via PCI-compliant gateways."
  }
];


  return (
    <section className="team-section">
      <Container>
        <h2 className="text-center mt-5 our_team_head">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="text-center team-subtitle">
          Learn more about how to use OddsJam and improve your betting strategy with these common questions.
        </p>

        <Accordion defaultActiveKey="0" className="faq-section my-4">
          {faqList.map((faq, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
