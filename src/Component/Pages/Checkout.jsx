import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { 
  Elements, 
  useStripe, 
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import "../../Assets/css/Checkout.css";
import { toast } from "react-toastify";
const stripePromise = loadStripe("pk_test_51Ln28UHxWF1dGmnD9lu1nHP1J02utFX75NY1C5tpuRbu4kKTBdXEQmQEjRSomEufNGnvAisS5DcYmdwKHNYtOHaY008Mu2hsjT");

const CardPaymentForm = ({ handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const cardElementOptions = {
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
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const cardElement = elements.getElement(CardElement);
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    
    // In a real implementation, you would send the payment method ID to your server
    // and create a PaymentIntent. Here we're simulating a successful payment.
    console.log('Payment method created:', paymentMethod.id);
    setLoading(false);
    handlePaymentSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="form-label">Card Details</label>
        <div className="card-element-container p-3 border rounded">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-100 mb-3" 
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

const BillingAddressForm = ({ billingDetails, setBillingDetails }) => {
  // Country options
  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    // Add more countries as needed
  ];

  // State options (US states as example)
  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    // Add more states as needed
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value
    });
  };

  return (
    <div className="billing-address-form mb-4">
      <h5 className="mb-3">Billing Address</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={billingDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={billingDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control
          type="text"
          name="address1"
          value={billingDetails.address1}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control
          type="text"
          name="address2"
          value={billingDetails.address2}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={billingDetails.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Zip/Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={billingDetails.city}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>State/Province</Form.Label>
            <Form.Select
              name="state"
              value={billingDetails.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={billingDetails.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
    </div>
  );
};

const CheckoutNew = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const paypalRef = useRef();
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });
  
  const handleContinue = (step) => {
    setActiveStep(step + 1);
  };
  
  const handleBack = (step) => {
    setActiveStep(step - 1);
  };
  
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
    navigate("/order-confirmation");
  };
  
  // Load PayPal SDK
  useEffect(() => {
    if (window.paypal) {
   
      return;
    }
    const clientId =
    process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
    console.log("🚀 ~ useEffect ~ clientId:", clientId)
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => console.log("PayPal SDK loaded");
    script.onerror = () => console.error("PayPal SDK failed to load");

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  useEffect(() => {
    if (
      paymentMethod !== "paypal" 
      ||
      !window.paypal ||
    
      !paypalRef.current ||
      cartItems.length === 0
       || isProcessing 
    ) {
      return;
    }

    try {
      paypalRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            color: "blue",
            shape: "rect",
            label: "pay",
          },

          createOrder: function (data, actions) {
            if (cartItems.length === 0) {
              toast.error("Your cart is empty");
              return Promise.reject("Cart is empty");
            }
            
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: total.toFixed(2),
                  },
                  description: `Order - ${cartItems.length} items`,
                },
              ],
            });
          },

          onApprove: function (data, actions) {
            setIsProcessing(true);
          
            return actions.order.capture().then(function (orderData) {
              const transactionId = orderData.id;
              console.log("Transaction completed:", transactionId);
              if (paypalRef.current) {
                paypalRef.current.innerHTML = "";
              }
              
              setIsProcessing(false);
              handlePaymentSuccess();
            });
          },
          
          onError: function (err) {
            console.error("PayPal error", err);
            toast.error("Payment failed. Please try again.");
            setIsProcessing(false);
          },
        })
        .render(paypalRef.current);
    } catch (error) {
      console.error("Error rendering PayPal buttons:", error);

    }
  }, [paymentMethod, cartItems, total]);
  
  return (
    <div className="main">
      <Container className="checkout-container my-5">
        
        <Row>
          {/* Left Side - Checkout Steps */}
          <Col lg={8} className="mb-4">
            {/* Step 1: Email */}
            <Card className={`checkout-card mb-3 ${activeStep === 1 ? 'active' : ''}`}>
              <Card.Body>
                <h4 className="step-title"> Your Email</h4>
                {activeStep === 1 ? (
                  <div className="step-content">
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <p>You'll receive receipts and notifications at this email
                    Already have an account</p>
                    <Button 
                      className="continue-btn"
                      onClick={() => handleContinue(1)}
                      disabled={!isEmailValid(email)}
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <div className="completed-step-content">
                    <p>{email} <span onClick={() => setActiveStep(1)} className="edit-link">Edit</span></p>
                  </div>
                )}
              </Card.Body>
            </Card>
            
            {/* Step 2: Phone Number */}
            <Card className={`checkout-card mb-3 ${activeStep === 2 ? 'active' : activeStep > 2 ? 'completed' : ''}`}>
              <Card.Body>
                <h4 className="step-title">Additional Information</h4>
                {activeStep === 2 && (
                  <div className="step-content">
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control 
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Button 
                        className="back-btn"
                        onClick={() => handleBack(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="continue-btn"
                        onClick={() => handleContinue(2)}
                        disabled={!phone}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep > 2 && (
                  <div className="completed-step-content">
                    <p>{phone} <span onClick={() => setActiveStep(2)} className="edit-link">Edit</span></p>
                  </div>
                )}
              </Card.Body>
            </Card>
            
            {/* Step 3: Payment */}
            <Card className={`checkout-card mb-3 ${activeStep === 3 ? 'active' : activeStep > 3 ? 'completed' : ''}`}>
              <Card.Body>
                <h4 className="step-title">Payment</h4>
                {activeStep === 3 && (
                  <div className="step-content">
                    <Form.Group className="mb-3">
                      <Form.Label>Payment Method</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Credit Card"
                          name="paymentMethod"
                          id="credit"
                          checked={paymentMethod === "credit"}
                          onChange={() => setPaymentMethod("credit")}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="PayPal"
                          name="paymentMethod"
                          id="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                        />
                      </div>
                    </Form.Group>
                    
                    {paymentMethod === "credit" && (
                      <>
                        <Elements stripe={stripePromise}>
                          <CardPaymentForm handlePaymentSuccess={handlePaymentSuccess} />
                        </Elements>
                        
                        {/* Billing Address Form */}
                        <BillingAddressForm 
                          billingDetails={billingDetails}
                          setBillingDetails={setBillingDetails}
                        />
                      </>
                    )}
                    
                    {paymentMethod === "paypal" && (
                      <>
                        <div className="paypal-container mb-4">
                          <p>You'll complete your purchase securely with PayPal.</p>
                          <div 
                            ref={paypalRef} 
                            className="paypal-button-container"
                            style={{ minHeight: "150px" }}
                          >
                            {!window.paypal && (
                              <div className="text-center py-3">
                                <div
                                  className="spinner-border text-primary"
                                  role="status"
                                >
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Loading PayPal...</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Billing Address Form */}
                        <BillingAddressForm 
                          billingDetails={billingDetails}
                          setBillingDetails={setBillingDetails}
                        />
                        
                        <div className="d-flex justify-content-between mt-3">
                          <Button 
                            className="back-btn"
                            onClick={() => handleBack(3)}
                            disabled={isProcessing}
                          >
                            Back
                          </Button>
                        </div>
                      </>
                    )}
                    
                    {paymentMethod === "credit" && (
                      <div className="d-flex justify-content-between mt-3">
                        <Button 
                          className="back-btn"
                          onClick={() => handleBack(3)}
                        >
                          Back
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {activeStep > 3 && (
                  <div className="completed-step-content">
                    <p>
                      {paymentMethod === "credit" ? "Credit Card" : "PayPal"}
                      <span onClick={() => setActiveStep(3)} className="edit-link"> Edit</span>
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Side - Order Summary */}
          <Col lg={4}>
            <Card className="order-summary-card">
              <Card.Body>
                <h4 className="summary-title">Order Summary</h4>
                <div className="order-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="d-flex">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="item-thumbnail" 
                        />
                        <div className="item-details">
                          <h6>{item.title}</h6>
                          <p>Quantity: {item.quantity}</p>
                          <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary-totals">
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between total-amount">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutNew;