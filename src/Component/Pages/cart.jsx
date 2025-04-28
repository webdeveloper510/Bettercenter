import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart,removeFromCart } from "../../cartSlice";
import { useNavigate } from "react-router-dom";
import "../../Assets/css/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total (no tax)
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleContinueShopping = () => {
    navigate("/"); 
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };


  return (
    <div className="main">
      <Container className="cart-container_new my-5">
        <h2 className="cart-title text-center mb-4">SHOPPING CART</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <h3>Your cart is empty</h3>
            <Button 
              className="continue-shopping mt-3" 
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              <Table responsive className="cart-table">
                <thead>
                  <tr className="heading_table">
                    <th>Image</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="cart-item">
                      <td>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="item-image" 
                        />
                      </td>
                      <td className="item-title">{item.title}</td>
                      <td className="item-quantity">{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>
                        <Button 
                          variant="link" 
                          className="remove-button"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Row className="mt-4">
              <Col md={6}>
                <Button 
                  className="continue-shopping" 
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
              </Col>
              <Col md={6}>
                <div className="cart-summary">
                  <div className="d-flex justify-content-between total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="checkout-button w-100 mt-3" 
                    onClick={handleCheckout}
                  >
                    CHECKOUT
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cart;