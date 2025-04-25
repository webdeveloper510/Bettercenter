import React, { useState, useEffect, useRef, useMemo } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { 
  Elements, 
  useStripe, 
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import Select from "react-select";
import { Country, State } from "country-state-city";
import "../../Assets/css/Checkout.css";
import { toast } from "react-toastify";
import api from "../../api";
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

    console.log('Payment method created:', paymentMethod.id);
  
    handlePaymentSuccess(paymentMethod.id);
    setLoading(false);
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

  const countries = useMemo(() => {
    return Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name
    }));
  }, []);
  
  const states = useMemo(() => {
    if (!billingDetails.country) return [];
    
    return State.getStatesOfCountry(billingDetails.country).map(state => ({
      value: state.isoCode,
      label: state.name
    }));
  }, [billingDetails.country]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value
    });
  };
  
  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "country") {
      setBillingDetails({
        ...billingDetails,
        [name]: selectedOption.value,
        state: "" 
      });
    } else {
      setBillingDetails({
        ...billingDetails,
        [name]: selectedOption.value
      });
    }
  };

  const selectedCountry = countries.find(country => country.value === billingDetails.country);
  const selectedState = states.find(state => state.value === billingDetails.state);

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
            <Select
              name="country"
              options={countries}
              value={selectedCountry}
              onChange={(option) => handleSelectChange(option, { name: "country" })}
              placeholder="Select Country"
              className="country-select"
              required
            />
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
            {states.length > 0 ? (
              <Select
                name="state"
                options={states}
                value={selectedState}
                onChange={(option) => handleSelectChange(option, { name: "state" })}
                placeholder="Select State/Province"
                className="state-select"
                required
              />
            ) : (
              <Form.Control
                type="text"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                placeholder="Enter state/province"
                required
              />
            )}
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

const OrderReview = ({ 
  cartItems, 
  total, 
  email, 
  phone, 
  paymentMethod, 
  billingDetails, 
  onPlaceOrder, 
  isProcessing,
  handlePaymentSuccess,
  showPaymentOptions
}) => {

  const countryData = Country.getAllCountries().find(
    country => country.isoCode === billingDetails.country
  );
  
  const stateData = State.getStatesOfCountry(billingDetails.country).find(
    state => state.isoCode === billingDetails.state
  );
  
  const countryName = countryData ? countryData.name : billingDetails.country;
  const stateName = stateData ? stateData.name : billingDetails.state;
  
  const paypalRef = useRef();

  useEffect(() => {
    if (
      !showPaymentOptions ||
      paymentMethod !== "paypal" || 
      !window.paypal ||
      !paypalRef.current ||
      cartItems.length === 0 ||
      isProcessing 
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
            return actions.order.capture().then(function (orderData) {
              const transactionId = orderData.id;
              console.log("Transaction completed:", transactionId);
              if (paypalRef.current) {
                paypalRef.current.innerHTML = "";
              }
              
              handlePaymentSuccess(transactionId); 
            });
          },
          
          onError: function (err) {
            console.error("PayPal error", err);
            toast.error("Payment failed. Please try again.");
          },
        })
        .render(paypalRef.current);
    } catch (error) {
      console.error("Error rendering PayPal buttons:", error);
    }
  }, [showPaymentOptions, paymentMethod, cartItems, total]);
  
  return (
    <div className="order-review">
      <h5 className="mb-3">Review Your Order</h5>
      
      <div className="review-section mb-3">
        <h6>Contact Information</h6>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
      
      <div className="review-section mb-3">
        <h6>Billing Address</h6>
        <p>{billingDetails.firstName} {billingDetails.lastName}</p>
        <p>{billingDetails.address1}</p>
        {billingDetails.address2 && <p>{billingDetails.address2}</p>}
        <p>{billingDetails.city}, {stateName} {billingDetails.zipCode}</p>
        <p>{countryName}</p>
      </div>
      
      <div className="review-section mb-3">
        <h6>Payment Method</h6>
        <p>{paymentMethod === "credit" ? "Credit Card" : "PayPal"}</p>
      </div>
      
      <div className="review-section mb-3">
        <h6>Order Items</h6>
        {cartItems.map(item => (
          <div key={item.id} className="d-flex justify-content-between mb-2">
            <div>
              <span>{item.title} x {item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
      
      {!showPaymentOptions ? (
        <Button 
          className="w-100" 
          onClick={onPlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>
      ) : (
        <>
          {paymentMethod === "credit" ? (
            <Elements stripe={stripePromise}>
              <CardPaymentForm handlePaymentSuccess={handlePaymentSuccess} />
            </Elements>
          ) : (
            <div className="paypal-container mb-4">
              <p>Complete your purchase securely with PayPal:</p>
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
          )}
        </>
      )}
    </div>
  );
};

const CheckoutNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [orderId, setOrderId] = useState(null);
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
  
  const handlePaymentSuccess = async (transactionId) => {
    try {
      setIsProcessing(true);
  
      const storedOrderId = localStorage.getItem('currentOrderId');
  
      if (!storedOrderId) {
        toast.error("Order information not found. Please try again.");
        setIsProcessing(false);
        return;
      }
  
      const paymentData = {
        orderId: storedOrderId,
        transaction_id: transactionId,
        purchase_status: true
      };
  
      const response = await api.purchaseOrder(paymentData);
  
      if (response instanceof Error) {
        toast.error("Failed to confirm payment. Please contact support.");
        setIsProcessing(false);
        return;
      }
  
      if (response.status === 200) {
        const orderDetails = {
          orderId: storedOrderId,
          orderDate: new Date().toISOString(),
          total: total,
          items: cartItems
        };
  
        localStorage.removeItem('currentOrderId');
        navigate("/order-confirmation", { 
          state: { orderDetails } 
        });
      } else {
        toast.error("Payment confirmation failed. Please try again.");
      }
  
    } catch (error) {
      console.error('Error completing payment:', error);
      toast.error("An error occurred during payment confirmation.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const prepareOrderData = () => {
    const countryData = Country.getAllCountries().find(
      country => country.isoCode === billingDetails.country
    );
    
    const stateData = State.getStatesOfCountry(billingDetails.country).find(
      state => state.isoCode === billingDetails.state
    );
    
    const countryName = countryData ? countryData.name : billingDetails.country;
    const stateName = stateData ? stateData.name : billingDetails.state;
    return {
      orderInfo: {
        orderId: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString(),
        paymentMethod: paymentMethod,
        total: total.toFixed(2)
      },
      customerInfo: {
        email: email,
        phone: phone,
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName
      },
      shippingAddress: {
        addressLine1: billingDetails.address1,
        addressLine2: billingDetails.address2 || "",
        city: billingDetails.city,
        state: stateName,
        country: countryName,
        zipCode: billingDetails.zipCode,
        phone: billingDetails.phone
      },
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        subtotal: (item.price * item.quantity).toFixed(2)
      }))
    };
  };
  
  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
  
      const orderData = prepareOrderData();
      const response = await api.placeOrder(orderData);
  
      if (response instanceof Error) {
        toast.error("An unexpected error occurred.");
        setIsProcessing(false);
        return;
      }
  
      if (response.status === 200) {
        // Store the order ID from the response in localStorage
        const orderId = response.data.orderId;
        localStorage.setItem('currentOrderId', orderId);
        setOrderId(orderId);
        
        setShowPaymentOptions(true);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
  
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  useEffect(() => {
    if (window.paypal) {
      return;
    }
    const clientId =
    process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
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
  
  return (
    <div className="main">
      <Container className="checkout-container my-5">
        
        <Row>
          {/* Left Side - Checkout Steps */}
          <Col lg={8} className="mb-4">
            {/* Step 1: Email */}
            <Card className={`checkout-card mb-3 ${activeStep === 1 ? 'active' : ''}`}>
              <Card.Body>
                <h4 className="step-title">Your Email</h4>
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
            
            {/* Step 3: Billing Address and Payment Method Selection */}
            <Card className={`checkout-card mb-3 ${activeStep === 3 ? 'active' : activeStep > 3 ? 'completed' : ''}`}>
              <Card.Body>
                <h4 className="step-title">Billing & Payment Method</h4>
                {activeStep === 3 && (
                  <div className="step-content">
                    {/* Billing Address Form */}
                    <BillingAddressForm 
                      billingDetails={billingDetails}
                      setBillingDetails={setBillingDetails}
                    />
                    
                    {/* Payment Method Selection */}
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
                    
                    <div className="d-flex justify-content-between mt-3">
                      <Button 
                        className="back-btn"
                        onClick={() => handleBack(3)}
                        disabled={isProcessing}
                      >
                        Back
                      </Button>
                      <Button 
                        className="continue-btn"
                        onClick={() => handleContinue(3)}
                        disabled={
                          !billingDetails.firstName ||
                          !billingDetails.lastName ||
                          !billingDetails.address1 ||
                          !billingDetails.country ||
                          !billingDetails.city ||
                          !billingDetails.state ||
                          !billingDetails.zipCode ||
                          !billingDetails.phone
                        }
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep > 3 && (
                  <div className="completed-step-content">
                    <p>
                      {billingDetails.firstName} {billingDetails.lastName} | {paymentMethod === "credit" ? "Credit Card" : "PayPal"}
                      <span onClick={() => setActiveStep(3)} className="edit-link"> Edit</span>
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
            
            {/* Step 4: Review and Payment */}
            <Card className={`checkout-card mb-3 ${activeStep === 4 ? 'active' : ''}`}>
              <Card.Body>
                <h4 className="step-title">Review & Payment</h4>
                {activeStep === 4 && (
                  <div className="step-content">
                    <OrderReview 
                      cartItems={cartItems}
                      total={total}
                      email={email}
                      phone={phone}
                      paymentMethod={paymentMethod}
                      billingDetails={billingDetails}
                      onPlaceOrder={handlePlaceOrder}
                      isProcessing={isProcessing}
                      handlePaymentSuccess={handlePaymentSuccess}
                      showPaymentOptions={showPaymentOptions}
                    />
                    {!showPaymentOptions && (
                      <div className="d-flex justify-content-between mt-3">
                        <Button 
                          className="back-btn"
                          onClick={() => handleBack(4)}
                          disabled={isProcessing}
                        >
                          Back
                        </Button>
                      </div>
                    )}
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