import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/SignUp/Signup'
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import Product from '../pages/Product/Product'
import MyProfile from '../pages/Profile/MyProfile'
import Orders from '../pages/Orders/Orders'

function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/products/:id' element={<Product/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path='/orders' element={<Orders/>} />
    </Routes>
  )
}

export default AppRoutes