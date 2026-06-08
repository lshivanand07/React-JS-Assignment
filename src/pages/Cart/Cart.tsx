import { useEffect, useState } from 'react';
import {fetchCartDetails} from '../../services/cartApi';
import './Cart.css'
import Button from '../../components/Buttons/Button';
import { checkoutOrder } from '../../services/checkoutApi';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';

interface CartListProps {
  cartItems: any[];
  showConfirm: boolean;
  message: string;
  handlePlaceOrder: () => void;
  handleCancelOrder: () => void;
  handleConfirmOrder: () => void;
}


const CartDataList = ({cartItems, showConfirm, message, handlePlaceOrder, handleCancelOrder, handleConfirmOrder}: CartListProps) =>{

  return(
     <div className='container'>
    <h1 className='cart-heading'>My Cart</h1>
   <div className='carts'>
    {cartItems[0]?.map((item: any) => (
        <div className='cart'>
        <div className='product_img'><img src={item.image_url} /></div>
        <h2>{item.product_name}</h2>
        <p>Price: ₹{item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Color: {item.color}</p>
        <p>Size: {item.size}</p>
        <p>description: {item.description}</p>
        <div className='Edit-Delete-btn'> 
            <Button text="Edit" ></Button>
           <Button text="Delete" ></Button>
        </div>
      </div>
    ))}
    </div>
    {showConfirm && (
     <div className="overlay">
     <div className="confirm-modal">
      <h3>Are you sure you want to place this order?</h3>
     <div className='order-confirm-cancel-btn'>
      <button onClick={handleConfirmOrder} >Confirm</button>
      <button onClick={handleCancelOrder}>Cancel</button>
    </div>
    <p className="error">{message}</p>
    </div>
    </div>
   )}
    <div className='palce-order-btn'>
        <Button text='PLACE ORDER' disabled={showConfirm} onClick={handlePlaceOrder}></Button>
    </div>
  </div>
  )
}

const EnhancedCartList = withLoader(withErrorHandling(CartDataList));



const CartDataContainer = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [serverError, setServerError] = useState<Error | null>(null);
  const [message, setMessage] = useState('');

  const [showConfirm , setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchCartItems = async () => {
    try {
      setLoading(true);

      const data = await fetchCartDetails();
      setMessage(data.message)
      setCartItems(data);
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

    const handlePlaceOrder = () => {
    setShowConfirm(true);
  };

  const handleConfirmOrder = async() => {
    setShowConfirm(true);
    try{
        setLoading(true)
    const data = await checkoutOrder()
    console.log(data)
    setMessage(data.message)
    }
   catch (error) {
    } finally {
      setLoading(false);
    }
  };

    const handleCancelOrder = () => {
    setShowConfirm(false);
    console.log('hello')
  };


  return (
    <EnhancedCartList 
  loading={loading}
  serverError={serverError}
  cartItems={cartItems}
  showConfirm={showConfirm}
  message={message}
  handlePlaceOrder={handlePlaceOrder}
  handleCancelOrder={handleCancelOrder}
  handleConfirmOrder={handleConfirmOrder}/>
  )
};

export default CartDataContainer


