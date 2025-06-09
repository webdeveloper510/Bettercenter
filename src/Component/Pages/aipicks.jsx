import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Spinner, Card, Row, Col, Badge } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import api, { apiClient } from '../../api';
import { toast } from 'react-toastify';
import AIContent from './aicontent';
import '../../Assets/css/aipicks.css'
const stripePromise = loadStripe(process.env.REACT_APP_Stripe);

const AIPicks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('month');
  const [planDetails, setPlanDetails] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);

  const checkSubscriptionStatus = async () => {
    try {
      const data = await api.getSubscriptionStatus();
      if (data.data) {
        setShowIframe(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
      return false;
    }
  };

  const fetchPlanDetails = async () => {
    setPlansLoading(true);
    try {
      const response = await api.getSubscriptionDetail();
      if (response.status === 200 && response.data) {
        setPlanDetails(response.data.plans || []);
      }
    } catch (error) {
      console.error("Failed to fetch plan details:", error);
      toast.error("Failed to load plan details");
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    const checkLoginStatusAndAccess = async () => {
      setSubscriptionLoading(true);
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("user_id");
      
      if (token && userId) {
        setIsLoggedIn(true);

        try {
          const freeTrialData = await api.getFreeTrialStatus();
          
          if (freeTrialData.free_trial) {
            setShowIframe(true);
          } else {
            const hasSubscription = await checkSubscriptionStatus();
            if (!hasSubscription) {
              setShowIframe(false);
              await fetchPlanDetails();
            }
          }
        } catch (error) {
          console.error("Failed to fetch access status:", error);
          setShowIframe(false);
          await fetchPlanDetails();
        }
      } else {
        setIsLoggedIn(false);
        setShowIframe(false);
        await fetchPlanDetails();
      }
      setSubscriptionLoading(false); 
    };

    checkLoginStatusAndAccess();
  }, []);

  const handleBuyNow = (planId) => {
    setSelectedPackage(planId);
    setShowCheckoutModal(true);
  };

  const renderPricingCards = () => {
    if (plansLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading plans...</span>
          </Spinner>
        </div>
      );
    }

    if (planDetails.length === 0) {
      return (
        <div className="text-center py-5">
          <h4 className="text-muted">No plans available at the moment</h4>
        </div>
      );
    }

    return (
      <Row className="justify-content-center">
        {planDetails.map((plan) => (
          <Col lg={4} md={6} sm={12} key={plan.id} className="mb-4">
            <Card className="h-100 shadow-lg border-0 pricing-card position-relative">

              <Card.Header className="bg-gradient text-white text-center py-4" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <h3 className="mb-0 fw-bold">{plan.title}</h3>
              </Card.Header>
              
              <Card.Body className="text-center p-4">
                <div className="price-section mb-4">
                  <div className="price-amount">
                    <span className="currency">$</span>
                    <span className="amount">{plan.amount}</span>
                    <span className="period">/month</span>
                  </div>
                </div>
                
                <p className="text-dark mb-4" style={{ lineHeight: '1.6' }}>
                  {plan.description}
                </p>
              </Card.Body>
              
              <Card.Footer className="bg-transparent border-0 p-4">
                <Button 
                  variant="primary"
                  size="lg" 
                  className="w-100 fw-bold"
                  onClick={() => handleBuyNow(plan.id)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '12px 0',
                    borderRadius: '8px'
                  }}
                >
                  Get Started
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <section className="main">
        <div className="outer_custom">
          <h2 className="text-center our_team_head py-4 gap-3">AI Picks</h2>
          <Container>
            {subscriptionLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : isLoggedIn && showIframe ? (
              <div className="row py-5 gap-3 position-relative">
                {iframeLoading && (
                  <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '800px', position: 'absolute', zIndex: 1, backgroundColor: 'white' }}>
                    <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
                <iframe
                  src="https://betscienceai.shinyapps.io/sports-predictor/?mode=full"
                  width="100%"
                  height="800"
                  style={{ border: 'none', zIndex: 0 }}
                  title="Sports Predictor"
                  onLoad={() => setIframeLoading(false)}
                  onError={() => {
                    setIframeLoading(false);
                    toast.error("Failed to load AI Picks.");
                  }}
                />
              </div>
            ) : (
              <div className="py-5">
                {renderPricingCards()}
              </div>
            )}

            <AIContent />
          </Container>
        </div>

        {/* Payment Checkout Component */}
        <Elements stripe={stripePromise}>
          <CheckoutModal 
            show={showCheckoutModal}
            onHide={() => setShowCheckoutModal(false)}
            selectedPackage={selectedPackage} 
            planDetails={planDetails}
            checkSubscriptionStatus={checkSubscriptionStatus}
          />
        </Elements>
      </section>
    </>
  );
};

const CheckoutModal = ({ show, onHide, selectedPackage, planDetails, checkSubscriptionStatus }) => {
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const plan = planDetails.find(p => p.id === selectedPackage);
    if (plan) {
      setSelectedPlan(plan);
      setPaymentAmount(parseFloat(plan.amount));
    }
  }, [selectedPackage, planDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        setLoading(false);
        return;
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        toast.error('Card rejected');
        console.error('Payment error:', error);
      } else {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        const data = {
          plan_type: selectedPackage,
          payment_id: paymentMethod.id,
          user_id: userId,
          amount: paymentAmount,
        };

        try {
          const result = await api.processPayment(data, token);
          const status = result?.status;
          
          if (status === 200) {
            toast.success('Payment successful!');
            const hasSubscription = await checkSubscriptionStatus();
            if (hasSubscription) {
              onHide();
              window.location.reload(); 
            } else {
              toast.error('Payment processed but subscription not activated. Please contact support.');
            }
          } else if (status === 400) {
            toast.error(result?.message || 'Invalid payment details or promo code');
          } else {
            toast.error('Payment not completed');
          }
        } catch (err) {
          console.error('Payment processing error:', err);
          toast.error(err.response?.data?.message || 'Payment not completed');
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center">
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Complete Your Purchase
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        {selectedPlan && (
          <div className="mb-4 p-3 bg-light rounded">
            <h5 className="mb-2">{selectedPlan.title}</h5>
            <p className="text-muted mb-2">{selectedPlan.description}</p>
            <h4 className="text-primary mb-0">${selectedPlan.amount}/month</h4>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Card Information</label>
            <div className="p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              type="submit"
              disabled={!stripe || !elements || loading}
              className="py-3 fw-bold"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </>
              ) : (
                `Pay $${paymentAmount.toFixed(2)} USD`
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AIPicks;