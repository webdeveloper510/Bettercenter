import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import "../../Assets/css/msubscription.css";
import api from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [planData, setPlanData] = useState([])
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setSubscriptionData([]);
      setPlanData([]);
      setHasActiveSubscription(false);

      const response = await api.getSubscriptionDetail()
      if (response && response.status === 200) {

        if (response.data && response.data.plans && Array.isArray(response.data.plans)) {
          setPlanData(response.data.plans);
        }
        if (
          response.data &&
          response.data.active_subscriptions &&
          Array.isArray(response.data.active_subscriptions) &&
          response.data.active_subscriptions.length > 0
        ) {
          const formattedData = response.data.active_subscriptions.map((item) => ({
            id: item.id,
            date: item.date.split(" ")[0],
            amount: `${item.amount}`,
            status: item.subscription_status,
            subscription_id: item.subscription_id,
            end_date: item.end_date ? item.end_date : 'N/A',
          }));
          setSubscriptionData(formattedData);
          setHasActiveSubscription(true);
        } else {
          setSubscriptionData([]);
          setHasActiveSubscription(false);
        }
      } else {
        setSubscriptionData([]);
        setPlanData([]);
        setHasActiveSubscription(false);
      }
    } catch (err) {
      console.error("Error fetching subscription data:", err);
      setSubscriptionData([]);
      setPlanData([]);
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
        setPlanData([]);
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

  const getStatusDisplay = (status) => {
    if (status === true || status === "active" || status === "Active") {
      return { text: "Active", color: "#28a745", bgColor: "#d4edda" };
    } else if (status === false || status === "inactive" || status === "Inactive") {
      return { text: "Inactive", color: "#dc3545", bgColor: "#f8d7da" };
    } else {
      return { text: "Unknown", color: "#6c757d", bgColor: "#e2e3e5" };
    }
  };

  return (
    <div className="main">
                  <h2
              className="text-center our_team_head py-4 gap-3"
              style={{ 
                fontSize: "3.5rem", 
                fontWeight: "300",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
                 Your subscription and billing information
            </h2>
      <div
        className="main_subscription"
        style={{ minHeight: "100vh" }}
      >
        <Container className="">
          {/* Header Section */}
          {loading ? (
            <div className="text-center text-white">
              {/* Enhanced Blue Loader */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <div 
                  className="spinner-border"
                  role="status"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    color: "#007bff",
                    borderWidth: "0.3rem"
                  }}
                >
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Main Subscription Card */}
              <Row className="justify-content-center">
                <Col lg={12} md={12}>
                  <Card
                    className="border-0 shadow-lg"
                    style={{
                    backgroundColor: "#1b1e3d",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    <Card.Body className="p-5">
                      {!hasActiveSubscription ? (
                        // No Active Subscription View
                        <div className="text-center">
                          <div className="mb-4">
                            <div
                              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                              style={{
                                width: "100px",
                                height: "100px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "50%",
                                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                              }}
                            >
                              <svg
                                width="50"
                                height="50"
                                fill="white"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                            </div>
                          </div>
                          <h3
                            className="text-white mb-3"
                            style={{ 
                              fontSize: "2.2rem", 
                              fontWeight: "600",
                              color: "#fff"
                            }}
                          >
                            No Active Subscription
                          </h3>
                          <p
                            className="text-white mb-5"
                            style={{
                              fontSize: "1.1rem",
                              lineHeight: "1.7",
                              maxWidth: "500px",
                              margin: "0 auto 3rem auto"
                            }}
                          >
                            You don't have any active subscriptions at the moment.
                            Choose a plan to get started with premium features and unlock your full potential.
                          </p>
                          <Link to="/aipicks">
                            <Button
                              size="lg"
                              className="px-5 py-3"
                              style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                fontWeight: "600",
                                fontSize: "1.2rem",
                                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                                transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                              }}
                            >
                              Browse Plans →
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <div className="text-center mb-4">
                            <div
                              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                              style={{
                                width: "80px",
                                height: "80px",
                                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                                borderRadius: "50%",
                                boxShadow: "0 8px 25px rgba(40, 167, 69, 0.3)"
                              }}
                            >
                              <svg
                                width="40"
                                height="40"
                                fill="white"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                              </svg>
                            </div>
                            <h3
                              className="text-white mb-2"
                              style={{ 
                                fontSize: "2.2rem", 
                                fontWeight: "600",
                                color: "#fff"
                              }}
                            >
                              Current Subscription
                            </h3>
                            {/* Plan Title and Amount */}
                            {planData.length > 0 && (
                              <div className="mb-4">
                                <h4 
                                  className="text-white mb-2"
                                  style={{ 
                                    fontSize: "1.8rem", 
                                    fontWeight: "500",
                                    color: "#fff"
                                  }}
                                >
                                  {planData[0].title} - ${planData[0].amount}
                                </h4>
                                <p 
                                  className="text-white mb-0"
                                  style={{
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                    maxWidth: "600px",
                                    margin: "0 auto",
                                    opacity: "0.9"
                                  }}
                                >
                                  {planData[0].description}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {/* Enhanced Subscription Details */}
                          <div 
                            className="mb-3 p-4" 
                            // style={{ 
                            //   background: "linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)",
                            //   borderRadius: "16px", 
                            //   border: "1px solid rgba(102, 126, 234, 0.1)",
                            //   boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
                            // }}
                          >
                            <div className="row outer_row">
                              <div className="col-md-6 same_sus" >
                                <div className="mb-4">
                                  <div 
                                    className="d-flex align-items-center mb-2"
                                    style={{ color: "#fff", fontWeight: "600" }}
                                  >
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    Subscription ID
                                  </div>
                                  <div 
                                    className="text-dark fw-bold"
                                    style={{ fontSize: "1.1rem" }}
                                  >
                                    #{subscriptionData[0]?.subscription_id || 'N/A'}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div 
                                    className="d-flex align-items-center mb-2"
                                    style={{ color: "#667eea", fontWeight: "600" }}
                                  >
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                    </svg>
                                    Start Date
                                  </div>
                                  <div 
                                    className="text-dark fw-bold"
                                    style={{ fontSize: "1.1rem" }}
                                  >
                                    {subscriptionData[0]?.date || 'N/A'}
                                  </div>
                                  
                                </div>
                                <div className="mb-4">
  <div 
    className="d-flex align-items-center mb-2"
    style={{ color: "#fff", fontWeight: "600" }}
  >
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
    End Date
  </div>
  <div 
    className="text-dark fw-bold"
    style={{ fontSize: "1.1rem" }}
  >
    {subscriptionData[0]?.end_date || 'N/A'}
  </div>
</div>
                              </div>
                              <div className="col-md-6 same_sus">
                                <div className="mb-4">
                                  <div 
                                    className="d-flex align-items-center mb-2"
                                    style={{ color: "#fff", fontWeight: "600" }}
                                  >
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                                      <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                    </svg>
                                    Amount
                                  </div>
                                  <div 
                                    className="text-dark fw-bold"
                                    style={{ fontSize: "1.8rem", color: "#28a745" }}
                                  >
                                    {subscriptionData[0]?.amount || '$0'}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div 
                                    className="d-flex align-items-center mb-2"
                                    style={{ color: "#667eea", fontWeight: "600" }}
                                  >
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    Status
                                  </div>
                                  <div>
                                    {(() => {
                                      const statusInfo = getStatusDisplay(subscriptionData[0]?.status);
                                      return (
                                        <span 
                                          className="badge d-inline-flex align-items-center"
                                          style={{
                                            backgroundColor: statusInfo.bgColor,
                                            color: statusInfo.color,
                                            fontSize: '1rem',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            border: `1px solid ${statusInfo.color}20`
                                          }}
                                        >
                                          {statusInfo.text === 'Active' && (
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                            </svg>
                                          )}
                                          {statusInfo.text}
                                        </span>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <p
                              className="text-white mb-4"
                              style={{ 
                                fontSize: "1.1rem", 
                                lineHeight: "1.6"
                              }}
                            >
                              Need to make changes to your subscription?
                            </p>

                            {/* Cancel Button */}
                            
                            <Button 
                              variant="outline-danger"
                              size="md"
                              onClick={handleCancelSubscription}
                              className=" cancel-button px-5 py-3 me-3"
                              style={{
                           borderRadius: "12px",
                              fontWeight: "600",
                              fontSize: "1.05rem", // slightly reduced for md
                              borderColor: "#dc3545",
                              color: "#dc3545",
                              borderWidth: "2px",
                              transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#dc3545";
                                e.target.style.color = "white";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#dc3545";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              Cancel Subscription
                            </Button>
                          </div>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ManageSubscription;