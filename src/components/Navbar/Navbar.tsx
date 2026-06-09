import './Navbar.css'
import Button from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { useEffect } from 'react'
function Navbar(){

  const [searchMessage, setSearchMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
    return(
         <header>
           <div className='container'>
            <div className="navbar">
            <div className="logo"><img src={logo} alt="Flipkart logo" /></div>
           <div className='nav-search-bar'>
            <input className="search-bar" type="text" value={searchMessage} onChange={(event)=>setSearchMessage(event.target.value)} placeholder='Search for Products, Brands and More'/>
            <button className='search-btn'>search</button>
            </div>
           <Button text='cart' onClick={()=> navigate('/cart')}></Button>
     {
     isLoggedIn ? (
    <>
   <div className="account-menu">
      <button className="account-btn">My Account ▼ </button>
      <div className="dropdown">
        <p onClick={() => navigate('/orders')}>Orders</p>
        <p onClick={() => navigate('/coupons')}>Coupons</p>
        <p onClick={() => navigate('/profile')}>Profile</p>
      </div>
    </div>
    <button onClick={handleLogout}>Logout</button> 
    </> 
           ) : (
    <>
      <Button text='Login' onClick={()=> navigate('/login')}></Button>
      <Button text="Sign Up" onClick={() => navigate('/signup')} />
    </>
    )
   }
    </div>
    </div>
      </header>
    )
}

export default Navbar