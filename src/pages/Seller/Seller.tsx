import './Seller.css';
import sellerHub from '../../assets/sellerHub.png';
import Button from '../../components/Buttons/Button';

function Seller() {
  return (
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
        <Button text="Login"></Button>
        <Button text="Start Selling"></Button>
      </div>
    </div>
  );
}

export default Seller;
