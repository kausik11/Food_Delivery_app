import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const [menu,setmenu]=useState("home");
  
  //the token and setToken function is all about store the token, define in StoreContext.js 
  const{getTotalCartAmount,token,setToken}= useContext(StoreContext)

  const navigate = useNavigate();

  //logout function that remove the token from localstorage
  //using the navigate('/') we redirect user after the logout operation
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }


  return (
    <div className='navbar'>
    <Link to='/'><img src={assets.logo} className='logo' alt=''></img></Link> 
     <ul className='navbar-menu'>
      <Link to='/' onClick={()=>{setmenu("home")}} className={menu==="home"?"active":""}>home</Link>
      <a href='#explore-menu' onClick={()=>{setmenu("menu")}} className={menu==="menu"?"active":""}>menu</a>
      <a href='#' onClick={()=>{setmenu("mobile-app")}} className={menu==="mobile-app"?"active":""}>mobile-app</a>
      <a href='#footer' onClick={()=>{setmenu("contact-us")}} className={menu==="contact-us"?"active":""}>contact-us</a>
     </ul>
     <div className='navbar-right'>
      <img src={assets.search_icon} alt=''></img>

      <div className='navbar-search-icon'>
        <Link to='/cart'><img src={assets.basket_icon} alt=''></img></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {/* !null == true, !1 == false */}
      {!token ? <button onClick={()=>setShowLogin(true)}>signin</button>:
      <div className='navbar-profile'>
              <img src={assets.profile_icon} className='white-filter' alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
              </div>}
    
     </div>
    </div>
  )
}

export default Navbar;
