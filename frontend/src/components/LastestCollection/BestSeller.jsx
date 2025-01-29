import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom'; // Import Link for navigation

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products?.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 10));
    }
  }, [products]);

  return (
    <div>
      <div className="product_container">
        <div className="list_header">
          <h1>Best Collection</h1>
          <hr className="divider" />
        </div>
        <div className="product-grid">
          {bestSeller.length > 0 ? (
            bestSeller.map((product) => (
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
            <p>No product is found in this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
