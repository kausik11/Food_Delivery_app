import React, { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'

const Home = () => {
  const[category,setCategory]=useState("All");
  // console.log(category);
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home