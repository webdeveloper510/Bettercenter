import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
const Faq = () => {
  

  return (
    <section className="team-section">
      <Container>
        {/* FAQ Section */}
        <h2 className="text-center mt-5 our_team_head">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="text-center team-subtitle">
          Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
        </p>

        <Accordion defaultActiveKey="0" className="faq-section">
          {[
            "How to Use OddsJam's NBA Odds Comparison Tool",
            "How to Read NBA Moneylines",
            "How to Read NBA Point Spreads",
            "How to Read NBA Over/Under or Totals",
            "What are NBA Prop Bets?",
          ].map((question, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx}>
              <Accordion.Header>{question}</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
