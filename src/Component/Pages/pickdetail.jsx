import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import all1 from "../../Assets/images/all1.png";
import "../../Assets/pickdetail.css";
import Faq from "./faq";

const Pickdetail = () => {
    return (
      <div className="main"> 
      <Container className="pick-details-container">
      <h2 className="pick-title">PICK DETAILS</h2>
        <Row className="align-items-center">
          {/* Left Side - Image */}
          <Col md={5}>
            <img src={all1} alt="Membership" className="pick-image" />
          </Col>
  
          {/* Right Side - Details */}
          <Col md={7}>
            <h3 className="membership-title">DAVID SMITH'S - 1 DAY MEMBERSHIP</h3>
            <p className="membership-description">
              This package includes all my picks for 1 day. If for some reason
              there are no picks that I feel confident taking that day, you will
              get an extra day until a day that I make a pick.
            </p>
            <p className="membership-description">
              All picks are released an hour before the game starts, as I take
              into account weather, late news, roster updates, and more to give
              you the most accurate picks possible.
            </p>
  
            {/* Quantity & Purchase Button */}
            <div className="d-flex align-items-center bottom_detsil">
              <Form.Select className="quantity-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
              <Button className="purchase-button purchase">PURCHASE</Button>
            </div>
          </Col>
        </Row>
        <Faq/>
      </Container>
      </div> 
    );
  };
  
  export default Pickdetail;