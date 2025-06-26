import React from "react";
import { FaHome } from "react-icons/fa";  
import { IoMdAddCircleOutline, IoIosLogOut } from "react-icons/io";
import { MdFormatListBulleted, MdAddShoppingCart } from "react-icons/md"; // ✅ Fixed icon import
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({setToken}) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <FaHome className='side-logo' />
                <h2>Gv Shopee</h2>
            </div>
            <div className="sidebar-links">
                <NavLink className='sidebar-link' to="/add">
                    <IoMdAddCircleOutline className="sidebar-icon" />
                    <p className="sidebar-text">Add Product</p>
                </NavLink>
                <NavLink className='sidebar-link' to="/list">
                    <MdFormatListBulleted className="sidebar-icon" />  {/* ✅ Fixed here */}
                    <p className="sidebar-text">List Products</p>
                </NavLink>
                <button onClick={() => setToken("")} className="sidebar-link">
                    <IoIosLogOut className="sidebar-icon" />
                    <p className="sidebar-text">Logout</p>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
