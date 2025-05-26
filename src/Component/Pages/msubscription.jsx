import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Table } from "react-bootstrap";
import '../../Assets/css/msubscription.css';
import api from "../../api";
import { toast } from "react-toastify";

const StatusTable = ({ subscriptionData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]); 
    if (subscriptionData && subscriptionData.length > 0) {
      setData(subscriptionData);
    }
  }, [subscriptionData]);

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
            {data.length > 0 ? (
              data.map((row, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No subscription data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

const ManageSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setSubscriptionData([]);
      setHasActiveSubscription(false);
      
      const response = await api.getSubscriptionDetail();
      if (response && response.status === 200) {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const formattedData = response.data.map((item) => ({
            id: item.id,
            date: item.date.split(' ')[0],
            amount: `$${item.amount}`,
            status: item.subscription_status
          }));
          setSubscriptionData(formattedData);
          setHasActiveSubscription(true);
        } else {
          setSubscriptionData([]);
          setHasActiveSubscription(false);
          console.log("No subscription data available");
        }
      } else {
        setSubscriptionData([]);
        setHasActiveSubscription(false);
      }
    } catch (err) {
      console.error("Error fetching subscription data:", err)
      setSubscriptionData([]);
      setHasActiveSubscription(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelSubscription = async () => {
    try {
      const response = await api.cancelSubscription();
      if (response && response.status === 200) {
        toast.success("Subscription cancelled successfully.");
        setSubscriptionData([]);
        setHasActiveSubscription(false);
        fetchSubscriptionData();
      } else {
        toast.error(response?.message || "Failed to cancel subscription.");
      }
    } catch (err) {
      console.error("Error cancelling subscription:", err);
      toast.error("An error occurred while cancelling your subscription.");
    }
  };

  return (
    <div className="main_suscription">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">
        Manage Subscription
      </h2>
      <Container className="py-5 text-white checkout-container inner_sub">
        {loading ? (
          <div className="text-center">Loading subscription details...</div>
        ) : (
          <>
            <StatusTable subscriptionData={subscriptionData} />

            {hasActiveSubscription && (
              <div className="mb-4">
                <h6>Subscription Details</h6>
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
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ManageSubscription;