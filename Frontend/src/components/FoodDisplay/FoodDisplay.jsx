import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItemCard from '../FoodItemCard/FoodItemCard'
// import { food_list } from '../../assets/assets'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);
    

    //we will get all the food item here and clg it
    // console.log(food_list);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {food_list.map((item,index)=>{
         
         //if we click on particular category the particular food Item will render in the foodItem component 
         //if category is 'All' we get all food item and if the category is item.category we will get specific food item
         if(category === 'All' || category === item.category){
          return <FoodItemCard key={index} id={item._id} name={item.name} price={item.price} image={item.image} description={item.description}/>
         }
        //in this return statement we render the FoodItem.jsx component that will display all fooditem in card
        
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
