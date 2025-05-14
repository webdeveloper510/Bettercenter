import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Spinner } from 'react-bootstrap';
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

const stripePromise = loadStripe(process.env.REACT_APP_Stripe);

const AIPicks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('month');
  const [packages, setPackages] = useState({
    month: { amount: '99', name: 'One Month Access' }
  });

useEffect(() => {
  const checkLoginStatusAndAccess = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user_id");
    if (token && userId) {
      setIsLoggedIn(true);

      try {
        const data = await api.getSubscriptionStatus(userId);
        setShowIframe(data.free_trial);
      } catch (error) {
        console.error("Failed to fetch access status:", error);
        setShowIframe(false);
      }
    } else {
      setIsLoggedIn(false);
      setShowIframe(false);
    }
    setSubscriptionLoading(false); 
  };

  checkLoginStatusAndAccess();
}, []);


  const handleBuyNow = () => {
    setShowCheckoutModal(true);
  };

  return (
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
    <div className="text-center py-5">
      <Button variant="primary" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </div>
  )}
</Container>

      </div>

      {/* Payment Checkout Component */}
      <Elements stripe={stripePromise}>
        <CheckoutModal 
          show={showCheckoutModal}
          onHide={() => setShowCheckoutModal(false)}
          selectedPackage={selectedPackage} 
          packages={packages}
          setShowIframe={setShowIframe}
        />
      </Elements>
    </section>
  );
};

const CheckoutModal = ({ show, onHide, selectedPackage, packages, setShowIframe }) => {
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (selectedPackage === 'month') {
      setPaymentAmount(parseFloat(packages.month.amount));
    } else if (selectedPackage === 'season') {
      setPaymentAmount(parseFloat(packages.season.amount));
    }
  }, [selectedPackage, packages]);

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
          const responseData = result;
          if (status === 200) {
            toast.success('Payment successful!');
            onHide();
            setShowIframe(true);
          } else if (status === 400) {
            toast.error(responseData?.message || 'Invalid payment details or promo code');
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
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Card Information</label>
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
              className="py-2"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                `Pay $${paymentAmount.toFixed(2)} USD`
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AIPicks;
