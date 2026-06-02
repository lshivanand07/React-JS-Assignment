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
          <header className="navbar">
            <div className="logo"><img src={logo} alt="Flipkart logo" /></div>
           <div className='nav-search-bar'>
            <input className="search-bar" type="text" value={searchMessage} onChange={(event)=>setSearchMessage(event.target.value)} placeholder='Search for Products, Brands and More'/>
            <button className='search-btn'>search</button>
            </div>
           <Button text='cart' onClick={()=> navigate('/cart')}></Button>

           { 
            isLoggedIn ? <button onClick={handleLogout}>Logout</button> :
             <Button text='Login' onClick={()=> navigate('/login')}></Button>
           }
            { 
            isLoggedIn ? null :
            <Button text='signUp' onClick={()=> navigate('/signup')}></Button>
           } 
         </header>
    )

}

export default Navbar