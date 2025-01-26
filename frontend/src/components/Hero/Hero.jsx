import React from 'react';
import hero_ima from '../../assets/woman1.png';
import { FaShippingFast } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import './Hero.css'


const Hero = () => {
  return (
    <div>
      {/* Hero Top Section */}
      <div className="hero">
      <div className="hero_top">
        <div className="hero_left">
          <h2>Unleash Your Unique Style.</h2>
          <h1>With Collections That Let Your Style and Fashion Speak</h1>
          <p>Shop the latest trends and classic essentials from our collections.</p>
        </div>
        <div className="hero_right">
          <img src={hero_ima} alt="Hero Visual" />
        </div>
      </div>


      {/* Hero Bottom Section */}
      <div className="hero_bottom">
        {/* Free Shipping */}
        <div className="hero_content">
          <div className="info_icon">
            <FaShippingFast className="hero_icon" />
          </div>
          <div className="detail">
            <h3>Free Shipping</h3>
            <p>Free Shipping on orders.</p>
          </div>
        </div>

        {/* Worldwide Delivery */}
        <div className="hero_content">
          <div className="info_icon">
            <FiSend className="hero_icon" />
          </div>
          <div className="detail">
            <h3>Worldwide Delivery</h3>
            <p>We deliver to all countries.</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="hero_content">
          <div className="info_icon">
            <BiSupport className="hero_icon" />
          </div>
          <div className="detail">
            <h3>24/7 Support</h3>
            <p>Full support throughout the process.</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="hero_content">
          <div className="info_icon">
            <MdPayment className="hero_icon" />
          </div>
          <div className="detail">
            <h3>Secure Payment</h3>
            <p>Your payment is secure.</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;
