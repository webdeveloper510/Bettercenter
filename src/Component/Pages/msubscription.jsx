import React, { useState } from "react";
import { Container, Card, Button, Form, Table } from "react-bootstrap";
import '../../Assets/css/msubscription.css';
import api from "../../api";
import { toast } from "react-toastify";

const StatusTable = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-05-15', amount: '$100', status: true },
    { id: 2, date: '2025-05-14', amount: '$250', status: false },
    { id: 3, date: '2025-05-13', amount: '$180', status: true },
  ]);

  const handleToggle = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, status: !row.status } : row
    );
    setData(updatedData);
  };

  return (
    <div className="mb-4">
      <h6>Your Subscriptions</h6>
      <Card className="bg-dark border-0 text-white table_outer">
        <Table responsive className="status_table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id={`status-switch-${row.id}`}
                    checked={row.status}
                    onChange={() => handleToggle(row.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

const ManageSubscription = () => {
  const handleCancelSubscription = async () => {
    try {
      const response = await api.cancelSubscription();
      console.log("🚀 ~ handleCancelSubscription ~ response:", response);

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
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">
        Manage Subscription
      </h2>
      <Container className="py-5 text-white checkout-container inner_sub">
        <StatusTable />

        <div className="mb-4">
          <h6>Subscriptions</h6>
          <Card className="bg-dark border-0 text-white">
            <Card.Body>
              <Button
                variant="outline-info"
                size="sm"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Optional: Billing History
        <div>
          <h6>Billing History</h6>
          <Card className="bg-dark border-0 text-white">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">No transactions yet!</p>
            </Card.Body>
          </Card>
        </div> */}
      </Container>
    </div>
  );
};

export default ManageSubscription;
