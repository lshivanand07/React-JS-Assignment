import './Footer.css'
function Footer(){
    return(
        <>
       <footer>
        <div className='container'>
             <div className="footer">
            <div className="About">
          <p>ABOUT</p>
          <a href="#">Contect Us</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Flipkart Stories</a>
          <a href="#">Press</a>
          <a href="Corporate Information"></a>
        </div>
        <div className="GROUP-COMPANIES">
            <p>GROUP COMPANIES</p>
            <a href="#">Myntra</a>
            <a href="#">cleartrip</a>
            <a href="Shopsy"></a>
        </div>
        <div className="HELP">
            <p>HELP</p>
            <a href="#">Payments</a>
            <a href="#">Shipping</a>
            <a href="#">Cancellation</a>
            <a href="#">FAQ</a>
        </div>
            </div>
        </div>
       </footer>
        </>
    )
}

export default Footer