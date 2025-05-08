import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_Stripe);

const AIPicks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('month'); // Default package
  const [packages, setPackages] = useState({
    month: { amount: '99', name: 'One Month Access' }
  });

  useEffect(() => {
    const checkLoginStatusAndAccess = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      console.log("🚀 ~ userId:", userId);
      console.log("🚀 ~ token:", token);

      if (token && userId) {
        setIsLoggedIn(true);

        try {
          const data = await api.getAccessStatus(userId);
          console.log("🚀 ~ Access API response:", data);
          setShowIframe(data.has_access);
        } catch (error) {
          console.error("Failed to fetch access status:", error);
          setShowIframe(false);
        }
      } else {
        setIsLoggedIn(false);
        setShowIframe(false);
      }
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
          {isLoggedIn && showIframe ? (
            <div className="row py-5 gap-3">
              <iframe
                src="https://betscienceai.shinyapps.io/sports-predictor/?mode=full"
                width="100%"
                height="800"
                style={{ border: 'none' }}
                title="Sports Predictor"
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

// Separate Checkout Modal component using Bootstrap Modal
 const CheckoutModal = ({ show, onHide, selectedPackage, packages, setShowIframe }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoData, setPromoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Calculate payment amount based on selected plan
    if (selectedPackage === 'month') {
      setPaymentAmount(
        promoData?.type === 'discount'
          ? parseFloat(packages.month.amount) * (1 - promoData.value / 100)
          : parseFloat(packages.month.amount)
      );
    } else if (selectedPackage === 'season') {
      setPaymentAmount(
        promoData?.type === 'discount'
          ? parseFloat(packages.season.amount) * (1 - promoData.value / 100)
          : parseFloat(packages.season.amount)
      );
    }
  }, [selectedPackage, promoData, packages]);

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
        alert('Card rejected');
        console.error('Payment error:', error);
      } else {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        console.log("🚀 ~ handleSubmit ~ token:", token)
        const data = {
          plan_type: selectedPackage,
          payment_id: paymentMethod.id,
          user_id: userId,
          amount: paymentAmount,
          promo_code: promoData ? promoCode : '',
        };

        try {
          const result = await api.processPayment(data, token);
          console.log("🚀 ~ handleSubmit ~ result:", result);
        
          if (result.status === 200) {
            toast.success('Payment successful!');
            onHide();
            setShowIframe(true);
          } else {
            toast.error('Payment not completed');
          }
        } catch (err) {
          console.error('Payment processing error:', err);
          toast.error('Payment not completed');
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
        <h5 className="text-center mb-4">
          You selected {packages[selectedPackage].name}
        </h5>
        
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

          {promoData && (
            <div className="alert alert-success">
              Promo code applied. You have received a{' '}
              {promoData?.type === 'discount' ? `${promoData?.value}% discount` : `${promoData?.value} days free trial`}
            </div>
          )}

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
                `Pay $${paymentAmount.toFixed(2)} USD for ${packages[selectedPackage].name}`
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