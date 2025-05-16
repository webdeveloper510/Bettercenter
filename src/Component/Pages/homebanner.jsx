import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import banner1 from '../../Assets/images/homebanner1.png';
import banner1 from '../../Assets/images/homebanner.png';
import banner2 from '../../Assets/images/homebanner2.png';
import '../../Assets/css/homebanner.css';

const PromoBanner = () => {
  return (
    <Carousel className="promo-slider">
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="First slide"
        />
        <Carousel.Caption className="text-center">
          <Link to="/signin">
            <Button variant="primary" className="banner-btn mt-3">
              CLICK HERE
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Second slide"
        />
        <Carousel.Caption className="text-center">
          <Link to="/signin">
            <Button variant="primary" className="banner-btn mt-3">
              CLICK HERE
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default PromoBanner;
