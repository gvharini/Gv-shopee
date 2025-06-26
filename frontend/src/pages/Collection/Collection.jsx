import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ShopContext } from '../../context/ShopContext';

import women_wear from '../../assets/Women-banner.png';
import men_wear from '../../assets/men-wear.png';
import kid_wear from '../../assets/kid-banner.png';
import './Collection.css';

const Collection = () => {
  const { products, searchTerm } = useContext(ShopContext);
  const { category } = useParams();

  const bannerImages = {
    men: [men_wear],
    women: [women_wear],
    kids: [kid_wear],
  };

  const filteredProduct = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase() &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const images = bannerImages[category.toLowerCase()] || [];

  return (
    <div className="collection-container">
      {/* === Banner Carousel === */}
      <div className="banner-carousel">
        {images.length > 0 ? (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
          >
            {images.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt={`${category}-banner-${idx}`} />
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="no-banner-msg">No banner available for this category</p>
        )}
      </div>

      {/* === Product Grid === */}
      <div className="product-grid">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image[0]} alt={product.name} />
                </Link>
              </div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products-msg">No products found in this category</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
