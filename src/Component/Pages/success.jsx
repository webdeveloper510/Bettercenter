import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaFileAlt, FaShoppingBag } from "react-icons/fa";
import { clearCart } from "../../cartSlice";
import "../../Assets/css/success.css";
import api from "../../api";
import { toast } from "react-toastify";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || {
    orderId: "",
    orderDate: new Date().toISOString(),
    total: 0,
    items: []
  });
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageIsReloading', 'true');
    };
    const checkIfReloaded = () => {
      if (sessionStorage.getItem('pageIsReloading') === 'true') {
        sessionStorage.removeItem('pageIsReloading');
        navigate('/page');
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    checkIfReloaded();
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (location.state?.orderDetails) {
          setLoading(false);
          return;
        }
        const orderId = localStorage.getItem('currentOrderId');
        
        if (!orderId) {
          setError("Order information not found.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError("An error occurred while loading order details.");
      } finally {
        setLoading(false);
        localStorage.removeItem('currentOrderId');
      }
    };

    fetchOrderDetails();
  }, [location.state]);
  
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="main">
        <Container className="py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading order details...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <Container className="py-5">
          <Card className="order-confirmation-card">
            <Card.Body className="text-center p-4">
              <h3 className="text-danger mb-3">Error</h3>
              <p>{error}</p>
              <Button 
                variant="primary" 
                className="mt-3"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </Card.Body>
          </Card>
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