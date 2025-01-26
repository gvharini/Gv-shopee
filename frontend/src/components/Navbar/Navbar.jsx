import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {BiUser} from 'react-icons/bi'
import { BiCart } from 'react-icons/bi';
import { FaCentos } from 'react-icons/fa';

import './Navbar.css'

//const navigate = useNavigate()



const Navbar = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },2000)
        navigate(path)
    }
    
  return (
    <div>
        {
        loading && (
            <div className="loader-container">
                <div className="loader">
                    <FaCentos className='loader-icon'/>
                </div>   
            </div>   
        )
        }
        <nav className="navbar">
            <div className="nav-top">
                <Link to='/'>
                <h2>StyleWave</h2>
                </Link>
                <div className="Search-bar">
                    <input type="text" className='search-input' placeholder='Search for products...'/>
                    <button className="search-btn">Search</button>
                </div>
                <div className="icons">
                <div className="profile-group">
                    <BiUser className='icon'/>
                    <div className="dropdown-menu">
                        <Link to='/login'>
                        <p className="dropdown-item">Account</p>
                        </Link>
                        <p className="dropdown-item">Logout</p>
                    </div>
                </div>
                <div className="cart-icon" onClick={()=>handleNavigation("/cart")}>
                    <BiCart className='icon'/>
                    <spam className="cart-count">0</spam>
                </div>
            </div>
            </div>
            <div className="nav-botton">
                <div className="nav-container">
                    <div onClick={()=>handleNavigation("/category/Men")} className="navbar-link">Men</div>
                    <div onClick={()=>handleNavigation("/category/Women")} className="navbar-link">Women</div>
                    <div onClick={()=>handleNavigation("/category/Kids")} className="navbar-link">Kids</div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar