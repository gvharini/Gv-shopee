import React,{useContext, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {BiUser} from 'react-icons/bi'
import { BiCart } from 'react-icons/bi';
import { FaCentos } from 'react-icons/fa';

import './Navbar.css'
import { ShopContext } from '../../context/ShopContext';

//const navigate = useNavigate()



const Navbar = () => {

    const [loading, setLoading] = useState(false)
    const {updateSearchTerm, getCartCount, token, setToken} = useContext(ShopContext)

    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token")
        setToken("")
        
    }

    const navigate = useNavigate()

    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },2000)
        navigate(path)
    }
    
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        updateSearchTerm(searchInput);
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
                <h2>Gvshopee</h2>
                </Link>
                <div className="Search-bar">
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='search-input' placeholder='Search for products...'/>
                    <button onClick={handleSearch} className="search-btn">Search</button>
                </div>
                <div className="nav-dropdown">
                    <button className="dropdown-button">Categories ▾</button>
                    <div className="dropdown-content">
                        <div onClick={() => handleNavigation("/category/Men")} className="dropdown-link">Men</div>
                        <div onClick={() => handleNavigation("/category/Women")} className="dropdown-link">Women</div>
                        <div onClick={() => handleNavigation("/category/Kids")} className="dropdown-link">Kids</div>
                    </div>
                </div>
                <div className="icons">
                <div className="profile-group">
                    <BiUser className='icon'/>
                    <div className="dropdown-menu">
                        <Link to='/login'>
                        <p className="dropdown-item">Account</p>
                        </Link>
                        <p onClick={logout} className="dropdown-item">Logout</p>
                    </div>
                </div>
                <div className="cart-icon" onClick={()=>handleNavigation("/cart")}>
                    <BiCart className='icon'/>
                    <span className="cart-count">{getCartCount()}</span>
                </div>
            </div>
            </div>

        </nav>
    </div>
  )
}

export default Navbar