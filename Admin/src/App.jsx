import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  //this url we use while we run this admin panel on local server
  // const url = "http://localhost:4000"
  //we use new url provided by render.com while we acess admin panel after deploy
  const url = "https://food-backend-b86u.onrender.com";
  return (
    <div>
    <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className='app-content'>
      <Sidebar/>
      <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
    </div>
    </div>
  )
}

export default App
