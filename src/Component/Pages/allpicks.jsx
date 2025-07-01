import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "../../Assets/allpicks.css";
import Faq from "./faq";
import api from "../../api";

const AllPicks = () => {
  const { adminId, adminName } = useParams();
  const firstName = adminName?.split("-")[0] || "Expert";

  const [loading, setLoading] = useState(true);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminPicks = async () => {
      try {
        setLoading(true);
        const response = await api.getAdminPicks(adminId);
        if (
          response &&
          response.status === 200 &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setMembershipPlans(response.data);
        } else {
          setMembershipPlans([]);
        }
      } catch (error) {
        console.error("Failed to fetch admin picks:", error);
        setError("Failed to load picks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdminPicks();
    }
  }, [adminId]);

  return (
    <div className="main">
      <Container className="all-picks-container text-center">
        <h2 className="section-title">ALL {firstName.toUpperCase()}'S PICKS</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <div className="text-center my-5 text-danger">
            <p>{error}</p>
          </div>
        ) : membershipPlans.length === 0 ? (
          <div className="text-center my-5">
            <p style={{ color: "white" }}>No data available.</p>
          </div>
        ) : (
          <Row className="g-4">
            {membershipPlans.map((plan) => (
              <Col key={plan.id} md={4} sm={6}>
                <Card className="membership-card">
                  <Link to="/pickdetail" state={{ pickId: plan.id }}>
                    <Card.Img
                      variant="top"
                      src={plan.file_url || ""}
                      alt={plan.title}
                    />
                  </Link>
                  <Card.Body>
                    
                    <Card.Title className="membership-title">
                      {/* {adminName.toUpperCase()}'S <br /> */}
                      {plan.title}
                    </Card.Title>
                    <Card.Text className="membership-price">${plan.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Faq />
      </Container>
    </div>
  );
};

export default AllPicks;
