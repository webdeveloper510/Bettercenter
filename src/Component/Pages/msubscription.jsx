import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import '../../Assets/css/msubscription.css';
import api from "../../api";
import { toast } from "react-toastify";
const ManageSubscription = () => {
  const handleCancelSubscription = async () => {
    try {
      const userId = localStorage.getItem("userId");
      
      const response = await api.cancelSubscription();
      console.log("🚀 ~ handleCancelSubscription ~ response:", response)
      
      if (response && response.success) {
        toast.success("Subscription cancelled successfully.");
      } else {
        toast.error(response?.message || "Failed to cancel subscription.");
      }
    } catch (err) {
      console.error("Error cancelling subscription:", err);
      alert("An error occurred while cancelling your subscription.");
    }
  };

  return (
    <div className="main_suscription">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">Manage Subscription</h2>
      <Container className="py-5 text-white checkout-container inner_sub">

        <div className="">
          <h6>Your Subscriptions</h6>
          <p className="text-muted">No Subscriptions</p>
        </div>

        <div className="mb-4">
          <Card className="bg-dark border-0 text-white">
            <Card.Body>
              <Button variant="outline-info" size="sm" onClick={handleCancelSubscription}>
                Cancel Subscription
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div>
          <h6>Billing History</h6>
          <Card className="bg-dark border-0 text-white">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">No transactions yet!</p>
            </Card.Body>
          </Card>
        </div>

      </Container>
    </div>
  );
};

export default ManageSubscription;