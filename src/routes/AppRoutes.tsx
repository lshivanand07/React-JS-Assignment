import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignupContainer from '../pages/SignUp/Signup';
import Home from '../pages/Home/Home';
import ProductContainer from '../pages/Product/Product';
import MyProfileContainer from '../pages/Profile/MyProfile';
import Orders from '../pages/Orders/Orders';
import ProtectedRoutes from './ProtectedRoutes';
import CartContainer from '../pages/Cart/Cart';
import AddressContainer from '../pages/Addresses/Address';
import Seller from '../pages/Seller/Seller';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/seller-account" element={<Seller />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/products/:id" element={<ProductContainer />} />
        <Route path="/cart" element={<CartContainer />} />=
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<MyProfileContainer />} />
        <Route path="/address" element={<MyProfileContainer />} />
        <Route path="/add-user-address" element={<AddressContainer />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
