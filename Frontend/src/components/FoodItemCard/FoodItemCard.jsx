import React, { useContext } from 'react'
import './FoodItemCard.css'
import { assets } from '../../assets/assets'
// import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext';

function FoodItemCard ({id,name,price,description,image}) {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  // console.log(cartItems);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            {/* <img className='food-item-image' src={image} alt="" /> */}
            {/* here we are using the image src that we define on backen "http://localhost:4000/images/1725457292723food_32.png" */}
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {/* !1 == flase, !null == true */}
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='food-item-counter'>
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                  <p className='cartitemsp'>{cartItems[id]}</p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt='' />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className='namewe'>{name}</p>
                <img className='ratingstars' src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItemCard