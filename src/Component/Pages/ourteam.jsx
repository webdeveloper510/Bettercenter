import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import "../../Assets/ourteam.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import team1 from "../../Assets/images/team1.png";
import team2 from "../../Assets/images/team2.png";
import team3 from "../../Assets/images/team3.png";
import team4 from "../../Assets/images/team4.png";
import Faq from "./faq";

const Ourteam = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleBuyClick = () => {
    navigate("/allpicks"); // ✅ Navigate to the desired page
  };

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
    <section className="main">
      <Container>
        <h2 className="text-center our_team_head">OUR TEAM</h2>
        <p className="text-center team-subtitle">
          From winning huge capping contests to features on HBO Sports & ESPN among other networks and publications, our cappers have over 100 years of combined experience backed by a proprietary database.
          <br />
          Whether you need free picks, parlays, teasers, or our most confident picks, we’re here to help you build a winning strategy.
        </p>

        <Row className="justify-content-center tem_menber">
          {teamMembers.map((member, index) => (
            <Col md={3} sm={6} key={index}>
              <Card className="team-card">
                <Card.Img variant="top" src={member.image} className="team-img" />
                <Card.Body className="text-center team_details">
                  <Card.Title className="team-name">{member.name}</Card.Title>
                  <Card.Text className="team-description">{member.description}</Card.Text>
                  <Button variant="outline-light buy_pick" onClick={handleBuyClick}>
                    BUY PICKS
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Faq />
      </Container>
    </section>
  );
};

export default Ourteam;
