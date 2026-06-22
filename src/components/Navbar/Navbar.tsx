import './Navbar.css';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { useEffect } from 'react';

function Navbar() {
  const [searchMessage, setSearchMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userToken') || '{}');
    setIsLoggedIn(!!token.token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  function searchProduct(product_name: string) {
    navigate('/', {
      state: {
        product_name: product_name,
      },
    });
  }

  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="Flipkart logo" />
          </div>
          <div className="nav-search-bar">
            <input
              className="search-bar"
              type="text"
              value={searchMessage}
              onChange={(event) => {
                setSearchMessage(event.target.value);
                searchProduct(searchMessage);
              }}
              placeholder="Search for Products, Brands and More"
            />
            <button
              className="search-btn"
              onClick={() => searchProduct(searchMessage)}
            >
              search
            </button>
          </div>
          <button className="cart-button" onClick={() => navigate('/cart')}>
            cart
          </button>
          {isLoggedIn ? (
            <>
              <div className="account-menu">
                <button className="account-btn">My Account ▼ </button>
                <div className="dropdown">
                  <p onClick={() => navigate('/orders')}>Orders</p>
                  <p onClick={() => navigate('/profile')}>Profile</p>
                </div>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Button text="Login" onClick={() => navigate('/login')}></Button>
              <Button text="Sign Up" onClick={() => navigate('/signup')} />
            </>
          )}

          <div className="account-menu">
            <Button text="More ▼"></Button>
            <div className="dropdown">
              <p onClick={() => navigate('/seller-account')}>Become a Seller</p>
              <p onClick={() => navigate('')}>Notification Settings</p>
              <p onClick={() => navigate('')}>24*7 Customer Care</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
