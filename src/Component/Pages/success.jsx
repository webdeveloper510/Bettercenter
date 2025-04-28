import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import { clearCart } from "../../cartSlice";
import "../../Assets/css/success.css";
import { toast } from "react-toastify";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || null);
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageIsReloading', 'true');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  useEffect(() => {
    const checkIfReloaded = () => {
      if (sessionStorage.getItem('pageIsReloading') === 'true') {
        sessionStorage.removeItem('pageIsReloading');
        navigate('/');
      }
    };
    checkIfReloaded();
  }, [navigate]);
  
  useEffect(() => {
    if (!location.state?.orderDetails) {
      setShouldRedirect(true);
      return;
    }
    dispatch(clearCart());
    setLoading(false);
  }, [location.state, dispatch]);
  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="main">
        <Container className="py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Finalizing your order...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="main">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="order-confirmation-card">
              <Card.Body className="text-center p-4">
                <div className="confirmation-icon mb-4">
                  <FaCheckCircle size={70} className="text-success" />
                </div>
                
                <h2 className="mb-4">Thank You for Your Order!</h2>
                <p className="lead mb-4">
                  Your payment was successful and your order has been placed.
                </p>
                
                <div className="d-flex justify-content-center gap-3">
                  <Button 
                    variant="primary" 
                    className="px-4"
                    onClick={() => navigate("/")}
                  >
                    <FaShoppingBag className="me-2" /> Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderConfirmation;