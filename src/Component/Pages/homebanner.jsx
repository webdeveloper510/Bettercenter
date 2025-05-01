import React from 'react';
import { Button } from 'react-bootstrap';
// import bannerimg from '../../Assets/images/homebanner.png';
import bannerimg2 from '../../Assets/images/homebanner2.png';
import '../../Assets/css/homebanner.css';

const PromoBanner = () => {
  return (
    <div className="single-image-banner text-center">
      <img
        src={bannerimg2}
        alt="Promo"
        className="img-fluid banner-img"
      />
      <Button variant="primary" className="banner-btn mt-3">
        CLICK HERE
      </Button>
    </div>
  );
};

export default PromoBanner;
