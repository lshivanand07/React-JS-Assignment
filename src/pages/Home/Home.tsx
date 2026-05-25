import './Home.css'
import Navbar from "../../components/Navbar/Navbar"
function Home(){
    return(
        <>
        <header className='header'><Navbar/></header>
        <div className="content">
            <h1>Welcome</h1>
        </div>
        </>
    )
}

export default Home