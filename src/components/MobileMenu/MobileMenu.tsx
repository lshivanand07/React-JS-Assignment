import './MobileMenu.css';
import homeImage from '../../assets/home.png';
import profile from '../../assets/person.png';
import { useNavigate } from 'react-router-dom';
import cartImage from '../../assets/cart.png';
import ordersImage from '../../assets/orders.png';

function MobileMenu() {
  const navigate = useNavigate();
  return (
    <div className="mobile-menu">
      <div className="home">
        <img src={homeImage} alt="home" onClick={() => navigate('/')} />
        <p>Home</p>
      </div>
      <div className="profile">
        <img src={profile} alt="profile" onClick={() => navigate('/profile')} />
        <p>Profile</p>
      </div>
      <div className="mobile-cart">
        <img src={cartImage} alt="cart" onClick={() => navigate('/cart')} />
        <p>Cart</p>
      </div>
      <div className="mobile-order">
        <img
          src={ordersImage}
          alt="orders"
          onClick={() => navigate('/orders')}
        />
        <p>Orders</p>
      </div>
    </div>
  );
}

export default MobileMenu;
