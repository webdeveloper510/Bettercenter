import React from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import team1 from "../../Assets/images/team1.png";
import team2 from "../../Assets/images/team2.png";
import team3 from "../../Assets/images/team3.png";
import team4 from "../../Assets/images/team4.png";

const Ourteam = () => {
  const teamMembers = [
    {
      name: "DAVID SMITH",
      image: team1,
      description:
        "David Duhain is a data analyst armed with predictive analytic and data mining skills. He has been handicapping games for the last 10 years where he specializes in the NBA, NFL, CFB, and MLB.",
    },
    {
      name: "LOUIE DIAMOND",
      image: team2,
      description:
        "Leading expert on grassroots sports betting; utilizes proprietary computer database. Previously featured on ESPN.",
    },
    {
      name: "TONY GULLEDGE",
      image: team3,
      description:
        "Line Making Handicapper, 30 years of grinding the numbers daily and slicing through the fog and confusion to find winners.",
    },
    {
      name: "JOHN HAHN",
      image: team4,
      description:
        "For the last two decades, John has built a reputation in the handicapping industry that is based on integrity, consistency, and most importantly, winning.",
    },
  ];

  return (
    <section className="team-section">
      <Container>
        <h2 className="text-center">OUR TEAM</h2>
        <p className="text-center team-subtitle">
          From winning huge capping contests to features on HBO Sports & ESPN among other networks and publications, our cappers have over 100 years of combined experience backed by a proprietary database.
        </p>

        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col md={3} sm={6} key={index}>
              <Card className="team-card" style={{ backgroundColor: member.bgColor }}>
                <Card.Img variant="top" src={member.image} className="team-img" />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">{member.name}</Card.Title>
                  <Card.Text className="team-description">{member.description}</Card.Text>
                  <Button variant="outline-light">BUY PICKS</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* FAQ Section */}
        <h2 className="text-center mt-5">FREQUENTLY ASKED QUESTIONS</h2>
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

export default Ourteam;
