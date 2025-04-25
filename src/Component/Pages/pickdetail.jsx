import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Assets/pickdetail.css";
import Faq from "./faq";
import api from "../../api";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cartSlice";
import { toast } from "react-toastify";

const Pickdetail = () => {
  const location = useLocation();
  const id = location.state?.pickId;
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [pickDetail, setPickDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('accessToken')));

  useEffect(() => {
    const fetchPickDetail = async () => {
      try {
        setLoading(true);
        const response = await api.getPickDetails(id);
        if (response && response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
          setPickDetail(response.data[0]);
        } else {
          setError("Failed to load pick details");
        }
      } catch (error) {
        console.error("Failed to fetch pick details:", error);
        setError("Failed to load pick details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPickDetail();
    }
  }, [id]);

  const handlePurchase = async () => {
    if (pickDetail) {
      const item = {
        id:id,
        title: pickDetail.title,
        price: pickDetail.price,
        image: pickDetail.file_url || require("../../Assets/images/all1.png"),
      };
      dispatch(addToCart({
        item,
        quantity
      }));
    
      toast.success("Item added to cart successfully!");
      navigate("/checkout");
    }
  };
  
  if (loading) {
    return (
      <div className="main">
        <Container className="text-center my-5">
          <Spinner animation="border" variant="light" />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <Container className="text-center my-5">
          <p style={{ color: "white" }}>{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="main">
      <Container className="pick-details-container">
        <h2 className="pick-title">PICK DETAILS</h2>
        {pickDetail && (
          <Row className="align-items-center">
            {/* Left Side - Image */}
            <Col md={5}>
              <img 
                src={pickDetail.file_url || require("../../Assets/images/all1.png")} 
                alt={pickDetail.title} 
                className="pick-image" 
              />
            </Col>

            {/* Right Side - Details */}
            <Col md={7}>
              <h3 className="membership-title">
                {pickDetail.title}
              </h3>
              <h3 className="membership-title">
                ${pickDetail.price}
              </h3>
              <p className="membership-description">{pickDetail.description || ''}</p>
              {pickDetail.additionalInfo && (
                <p className="membership-description">{pickDetail.additionalInfo}</p>
              )}

              {/* Quantity & Purchase Button */}
              <div className="d-flex align-items-center bottom_detsil">
                <Form.Select 
                  className="quantity-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
                <Button 
                  className="purchase-button purchase"
                  onClick={handlePurchase}
                >
                 Purchase
                </Button>
              </div>
            </Col>
          </Row>
        )}
        <Faq />
      </Container>
    </div>
  );
};

export default Pickdetail;