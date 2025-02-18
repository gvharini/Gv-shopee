import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../../App';
import { toast } from 'react-toastify';
import { AiTwotoneDelete } from "react-icons/ai";
import './List.css'

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token }
      });

      console.log("API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.product)) {
        setList(response.data.product);
      } else {
        setList([]); // Set an empty array to avoid undefined errors
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      setList([]); // Ensure list is never undefined
      toast.error(error.message || "Something went wrong");
    }
  };

  const removeProduct = async(_id) => {
    try{
      const response = await axios.post(backendUrl + '/api/product/remove', {_id}, {headers: {token}})

      if(response.data.success){
        toast.success(response.data.message)
        console.log(response.data.message)

        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="product-title">Product List</p>
      <div className="product-list-container">
        <div className="product-table-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='action-title'>Action</b>
        </div>

        {/* Display products or message if empty */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className='product-row' key={index}>
              {/*{<img className='product-image' src={item.image?.[0] || ''} alt="Product" />*/}
              <img
                className='product-image'
                src={item.image?.[0] ? item.image[0] : null}
                alt="Product"
                onError={(e) => e.target.src = "default-image.jpg"}
                style={{ display: item.image?.[0] ? "block" : "none" }}
              />

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <AiTwotoneDelete onClick={() => removeProduct(item._id)} className='product-action' />
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
