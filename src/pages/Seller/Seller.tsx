/* eslint-disable @typescript-eslint/no-explicit-any */
import './Seller.css';
import sellerHub from '../../assets/sellerHub.png';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

interface SellerProps {
  athenticate: boolean;
  SellerLogin: () => void;
  SellerSignUp: () => void;
  sellerLogout: () => void;
}

function Seller({
  athenticate,
  SellerLogin,
  SellerSignUp,
  sellerLogout,
}: SellerProps) {
  return (
    <>
      <div className="container">
        <p>
          Existing Seller? Explore our product recommendations with Dhamaka
          Selection
        </p>
        <hr />
        <div className="sellar-navbar">
          <img src={sellerHub} alt="seller hub" />
          <a href="#">Sell Online</a>
          <a href="#">Fees and Commission</a>
          <a href="#">Grow</a>
          <a href="#">Learn</a>
          <a href="#">Shopsy</a>
          {athenticate ? (
            <Button text="Logout" onClick={sellerLogout}></Button>
          ) : (
            <Button text="Login" onClick={SellerLogin}></Button>
          )}
          <Button text="Start Selling" onClick={SellerSignUp}></Button>
        </div>
        <Breadcrumbs />
        <div className="hero-sction">
          <h1>Sell Online with Flipkart</h1>
        </div>
      </div>
    </>
  );
}

const EnhancedSeller = withLoader(withErrorHandling(Seller));

function SellerContainer() {
  const navigate = useNavigate();
  const [athenticate, setAthenticate] = useState<boolean>(false);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('userToken') || '{}');
    setToken(storedToken);
    if (storedToken.token && storedToken.role === 'seller') {
      setAthenticate(true);
    }
  }, []);

  function SellerLogin() {
    console.log('Logintoken', token);
    if (!token?.token || token?.role !== 'seller') {
      return navigate('/login');
    }
    setAthenticate(true);
  }

  function SellerSignUp() {
    if (!token?.token || token?.role !== 'seller') {
      return navigate('/signup');
    } else {
      return navigate('/seller-account/sell-new-product');
    }
  }

  function sellerLogout() {
    localStorage.removeItem('userToken');
    setAthenticate(false);
    setToken(null);
  }

  return (
    <EnhancedSeller
      athenticate={athenticate}
      SellerLogin={SellerLogin}
      SellerSignUp={SellerSignUp}
      sellerLogout={sellerLogout}
    />
  );
}

export default SellerContainer;
