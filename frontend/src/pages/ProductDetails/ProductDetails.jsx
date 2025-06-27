import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../../context/ShopContext'
import {useParams} from 'react-router-dom'
import './ProductDetails.css'
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct'


const ProductDetails = () => {

  const {products, currency, addToCart} = useContext(ShopContext)
  const {productId} = useParams()

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');

  const fectchProductData = async () => {
    products.map((item) => {
      if (item._id === productId){
        setProductData(item)
        setImage(item.image[0])
      }
    })
  }

  useEffect(()=> {
    fectchProductData();
  },[productId, products])

  return productData ? (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-container">
              {productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='thumbnail'/>
              ))}
            </div>
            <div className="main-image-container">
              <img src={image} alt="" className='main-image' />
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-name">{productData.name} </h1>
            <hr className='product-divider'/>
            <p className="product-price">{currency}{productData.price} </p>
            <p className="product-description">{productData.description} </p>
            <div className="size-selctor">
              <p>Select Size</p>
              <div className="size-bottons">
                {productData.sizes.map((item, index) => (
                  <button key={index} onClick={()=>setSize(item)} className={`size-botton ${item === size ? 'active-size' : ''}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <hr className="product-divider"/>
              <div className="product-policy">
                
              </div>
              <button onClick={()=>addToCart(productData._id, size)} className="add-to-cart-btn">ADD TO CART</button>
          </div>
        </div>
        <div className="description-review-sect">
          <div className="tabs">
            <b className="tab active">Description</b>
          </div>
          <div className="discription-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, quos quidem id labore quis accusamus sunt iste possimus magnam voluptates ullam magni corporis, alias numquam? Ea, distinctio. Illum, neque ea?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, mollitia. Doloremque dolorem reiciendis accusamus odit voluptates ducimus, quaerat a alias dolore aut asperiores eligendi soluta natus aliquid libero fuga ex!</p>
          </div>
        </div>
        <RelatedProduct category={productData.category}/>
      </div>
    </div>
  ) : <div>No product matches with the product id</div>
}

export default ProductDetails