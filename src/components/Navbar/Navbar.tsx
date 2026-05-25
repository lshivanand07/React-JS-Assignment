import './Navbar.css'
import Button from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
function Navbar(){

    const navigate = useNavigate()
    return(
          <nav className="navbar">
            <h1>Flipkart</h1>
            <div className='buttons'>
               <Button text="Login" onClick={() => navigate('/login')}></Button>
               <Button text="Sign Up"></Button>
            </div>
          </nav>
    )

}

export default Navbar