import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SignupContainer from '../pages/SignUp/Signup'
import Home from '../pages/Home/Home'
import Product from '../pages/Product/Product'
import MyProfileContainer from '../pages/Profile/MyProfile'
import Orders from '../pages/Orders/Orders'
import ProtectedRoutes from './ProtectedRoutes'
import CartContainer from '../pages/Cart/Cart'

function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path='/products/:id' element={<ProtectedRoutes> <Product/> </ProtectedRoutes>} />
      <Route path='/cart' element={<ProtectedRoutes> <CartContainer /> </ProtectedRoutes>} />
      <Route path="/profile" element={<ProtectedRoutes> <MyProfileContainer/> </ProtectedRoutes>} />
      <Route path='/profile/address' element={<ProtectedRoutes> <MyProfileContainer/> </ProtectedRoutes>} />
      <Route path='/orders' element={<ProtectedRoutes> <Orders/> </ProtectedRoutes>} />
    </Routes>
  )
}

export default AppRoutes