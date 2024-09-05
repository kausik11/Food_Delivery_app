import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)


  const [currState,setCurrState] = useState("Login");
 
  //here in this state we will store user name,email and password
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(Prevdata=>({...Prevdata,[name]:value}))
  }

  //this useEffect to check purpose, this usestate reernder the component when the value of "data" is changing
  // useEffect(()=>{console.log(data)},[data])

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success){
      //here we save the token using setToken() function, that define on StoreContext.js
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(res.data.message)
    }

  }




  return (
//     <div className='login-popup'>
//         {/* <form onSubmit={onLogin} className="login-popup-container"> */}
//         <form  className="login-popup-container">
//           <div className="login-popup-title">
//             <h2>{currState}</h2>
//             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//           </div>
//           <div className="login-popup-inputs">
//             {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
//             <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
//             <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
//           </div>
//           <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
//           <div className="login-popup-condition">
//             <input type="checkbox" required/>
//             <p className='continuee'>By continuing, i agree to the terms of use & privacy policy</p>
//           </div>
//           {currState==="Login"
//           ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
//           :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
//           }
//         </form>
// </div>


<div className='login-popup'>
<form onSubmit={onLogin} className="login-popup-container">
  <div className='login-popup-title'>
      <h2>{currState}</h2>
      <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}></img>
  </div>
  <div className='login-popup-inputs'>
  {currState === "Login" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your Name' required></input>}
      
      <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter Your Email' required></input>
      <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password' required></input>
  </div>
  <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
  <div className='login-popup-condition'>
      <input type='checkbox' required/>
      <p>By continuing, I agree to the terms of use & privacy policy</p>
  </div>
  {currState==="Login" ? <p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click Here</span></p> : 
      <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
      }
</form>
</div>
  )
}

export default LoginPopup