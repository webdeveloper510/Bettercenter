import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "../../Assets/allpicks.css";
import all1 from "../../Assets/images/all1.png";
import all2 from "../../Assets/images/all2.png";
import all3 from "../../Assets/images/all3.png";
import all4 from "../../Assets/images/all4.png";
import all5 from "../../Assets/images/all5.png";
import all6 from "../../Assets/images/all6.png";
import Faq from "./faq";

const membershipPlans = [
  {
    id: 1,
    title: "1 DAY MEMBERSHIP",
    price: "$50.00",
    image: all1,
  },
  {
    id: 2,
    title: "7 DAY MEMBERSHIP",
    price: "$250.00",
    image: all2,
  },
  {
    id: 3,
    title: "30 DAY MEMBERSHIP",
    price: "$600.00",
    image: all3,
  },
  {
    id: 4,
    title: "1 DAY MEMBERSHIP",
    price: "$50.00",
    image: all4,
  },
  {
    id: 5,
    title: "7 DAY MEMBERSHIP",
    price: "$250.00",
    image: all5,
  },
  {
    id: 6,
    title: "30 DAY MEMBERSHIP",
    price: "$600.00",
    image: all6,
  },
];

const AllPicks = () => {
  return (
    <div className="main">
    <Container className="all-picks-container text-center">
      <h2 className="section-title">ALL DAVID'S PICKS</h2>
      <Row className="g-4">
        {membershipPlans.map((plan) => (
          <Col key={plan.id} md={4} sm={6}>
            <Card className="membership-card">
              <Card.Img variant="top" src={plan.image} alt={plan.title} />
              <Card.Body>
                <Card.Title className="membership-title">
                  DAVID SMITH'S <br />
                  {plan.title}
                </Card.Title>
                <Card.Text className="membership-price">{plan.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Faq/>
    </Container>
    </div>
  );
};

export default AllPicks;
