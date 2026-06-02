import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import Product from '../pages/Product/Product'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path='/products/:id' element={<Product/>} />
      

      <Route element={<ProtectedRoute />}>
         <Route path='/cart' element={<Cart/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes