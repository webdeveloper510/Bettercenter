import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import '../../Assets/css/msubscription.css';


const ManageSubscription = () => {
  return (
        <div className="main_suscription">
            <h2 class="text-center our_team_head pb-4 py-5 gap-3">Manage Subscription</h2>
    <Container className="py-5 text-white checkout-container inner_sub">
      {/* <h4 className="mb-4">Manage Subscription</h4> */}

      {/* Subscriptions */}
      <div className="">
        <h6>Your Subscriptions</h6>
        <p className="text-muted">No Subscriptions</p>
      </div>

      {/* Payment Methods */}
      <div className="mb-4">
        {/* <h6>Payment Methods</h6> */}
        <Card className="bg-dark border-0 text-white">
          <Card.Body>
            {/* <p className="text-muted mb-4">Subscription</p>
            <hr className="border-secondary" /> */}
            <Button variant="outline-info" size="sm">
              Cancel Subscription
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* Billing History */}
      <div>
        <h6>Billing History</h6>
        <Card className="bg-dark border-0 text-white">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">No transactions yet!</p>
            {/* <a href="#" className="text-info text-decoration-none">
              Contact Sales
            </a> */}
          </Card.Body>
        </Card>
      </div>
    </Container>
    </div>
  );
};

export default ManageSubscription;
