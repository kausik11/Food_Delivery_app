import { createContext, useEffect, useState } from "react";
// import { food_list } from "../../../assets/frontend_assets/assets.js";
import axios from "axios";


// console.log(food_list);
//we have created a context  and exporting it
export const StoreContext = createContext(null)

//create a StoreContext provider function and pass the props,
const StoreContextProvider = (props)=>{

    //this is for FoodItem.jsx
    const [cartItems,setCartItems] = useState({});

    //here within "token" variable the token will save
    const [token,setToken] = useState("");

    1.//this state is used to fetch all the food items in home page instead of the "food_list of assets.js"
    //as because everyWhere in our project we are using the "food_list" variable, so instead of creating new variable we are using the same name "food_list" and makes the previos "food_list" comment.
    const[food_list,setFood_list]=useState([]);

    2. //now we are creating a function that we load the food items in this state from the databse
     const fetchFoodList =async()=>{
      //now we call the api
      const response = await axios.get(url+"/api/food/list");
      //set the data to "new food_list"
      setFood_list(response.data.data);
     } //to run this function when the webpage is reloaded we add this within the useEfeect()

    // console.log(cartItems);
    // we use this Backend url when our project is in the local server
    // const url = "http://localhost:4000"
    //but for online backend from render.com we use another backend for "Backend URL"
    const url = "https://food-backend-b86u.onrender.com"


    //add to cart functionalities
    const addToCart = async (itemId) => {
        ////first we check that if the user adding the product first time in cart that case we will create one entry
        //!0 is true, !1 is false
        if(!cartItems[itemId])//if the cartItems[id] is not available
            {
                setCartItems((prevItem)=>({...prevItem,[itemId]:1}))//in this obj the key will be 'itemId' and value is the number of occourances 
            }else{
                //if the item is already in cart then we will increase the count of that item by
                setCartItems((prevItem)=>({...prevItem,[itemId]:prevItem[itemId]+1}))
            }
            //if the token is available means user has logged in then add the data to the specific user's cartData object
            if (token){
                await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            }
    }

    //remove from cart
    const removeFromCart = async (itemId) => {
        //if the item is in cart then we will decrease the count of that item by 1
        // if(cartItems[itemId] >= 1){
        //     setCartItems((prevItem)=>({...prevItem,[itemId]:prevItem[itemId]-1}))
        // }
        setCartItems((prevItem)=>({...prevItem,[itemId]:prevItem[itemId]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    //this will store the cart data and show the number of items you have already added to cart, even after refresh the page , we call this function within useEffect function
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        //now we store the data within the state function
        setCartItems(response.data.cartData);
    }

    //get total cart amount 
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) 
        {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);//item is "key value" in cartItems 
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }


    // useEffect(()=>{
    //     //console.log(cartItems) 
    // },[cartItems]);


    //to overcome the issue "after login user should login mode even after refresh"
    //because after refresh the page the "token" variable becomes blank, but using this useEffect the "token" variale is assign with the token that is within localstorage eith setToken() function
    useEffect(()=>{
    
        async function loadData() {
            await fetchFoodList(); 
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    

    
    // useEffect(()=>{
    //     async function loadData() {
    //         await fetchFoodList();
    //         if (localStorage.getItem("token")) {
    //             setToken(localStorage.getItem("token"));
    //             await loadCartData(localStorage.getItem("token"));
    //         }
    //     }
    //     loadData();
    // },[])

    //if we add any value within this object we can acess the value from any component using the context
    const contextValue = {
        food_list,
        url,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        setToken,
        token
    }
    //we need to return the context provider and pass the context value and the props   
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;

//and now we need to wrap our app with the StoreContextProvider and this part will done on main.jsx
