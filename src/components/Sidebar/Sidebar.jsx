import React from 'react'
import { GiButterfly } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa6";
import {IoIosLogOut,IoMdAddCircleOutline} from 'react-icons/io'
import {MdFormatListBulletedAdd} from 'react-icons/md'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({setToken}) => {
  return (
    <div className="sidebar-container">
        <div className="sidebar-header">
            <GiButterfly className='side-logo'/>
            <h2>GvShopee</h2>
        </div>
        <div className="sidebar-links">
            <NavLink className='sidebar-link' to="/add">
                <IoMdAddCircleOutline className='sidebar-icon' />
                <p className='sidebar-text'>Add Product</p>
            </NavLink>
            <NavLink className='sidebar-link' to="/list">
                <MdFormatListBulletedAdd className='sidebar-icon' />
                <p className='sidebar-text'>List Products</p>
            </NavLink>
            <NavLink className='sidebar-link' to="/orders">
                <FaOpencart className='sidebar-icon' />
                <p className='sidebar-text'>Orders</p>
            </NavLink>
            <button onClick={() => setToken("")} className='sidebar-link'>
                <IoIosLogOut className='sidebar-icon'/>
                <p className='sidebar-text'>Logout</p>
            </button>
        </div>
    </div>
  )
}

export default Sidebar