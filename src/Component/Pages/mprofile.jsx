import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import '../../Assets/css/mprofile.css';

const MProfile = () => {
  return (
    <div className="main_profile">
         <h2 class="text-center our_team_head pb-4 py-5 gap-3">Overview</h2>
      <Container className="py-5 text-white">
        {/* <h4 className="pb-4">Overview</h4> */}
        <p className="text-muted mb-4">Update your personal information</p>

        <Card className="bg-dark border-0 text-white p-4">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" defaultValue="pankaj" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" defaultValue="kumar" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" defaultValue="pankaj_kumar@codenomad.net" disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number (Optional)</Form.Label>
                  <Form.Control type="text" placeholder="Phone Number (Optional)" />
                </Form.Group>
              </Col>
            </Row>

            {/* Replace this row with Change Password and Confirm Password */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password" />
                </Form.Group>
              </Col>
            </Row>

            {/* <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-muted">
                <strong className="text-white">Enable Push Notifications</strong> (sent through the OddsJam mobile app)
              </span>
              <Form.Check type="switch" id="custom-switch" />
            </div> */}

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2">
                Cancel
              </Button>
              <Button variant="info">Save Changes</Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default MProfile;
