import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  // console.log("this is within Exploremenu component",category);
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
      <div className='explore-menu-list'>
        {menu_list.map((currele,index)=>{
            return(
                <div onClick={()=>{setCategory(prevState=>prevState===currele.menu_name ? "All" : currele.menu_name)}} key={index} className='explore-menu-list-item'>
                    <img className={category===currele.menu_name ? "active": ""} src={currele.menu_image} alt='menu image'></img>
                    <p>{currele.menu_name}</p>
                </div>
            )
            })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu