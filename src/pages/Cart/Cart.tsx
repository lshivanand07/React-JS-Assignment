import { useEffect, useState } from 'react';
import {fetchCartDetails} from '../../services/cartApi';
import Loader from '../../components/Loader/Loader';
import ErrorHandling from '../../components/ErrorHandle/Error';
import './Cart.css'
import withAuth from '../../hoc/withAuth';
import Button from '../../components/Buttons/Button';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState('');

  const cartData = async () => {
    try {
      setLoading(true);
      setServerError(false);

      const data = await fetchCartDetails();

      console.log(data);
      setCartItems(data);
    } catch (error) {
      setServerError(true);

      if (error instanceof Error) {
        setMessage(error.message);
        console.log(error.message)
      }else if(error instanceof TypeError){
        setMessage(error.message);
      } else {
        setMessage('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (serverError) {
    return <ErrorHandling message={message} />;
  }

  return (
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
  </div>
  )
};

const ProtectedCart = withAuth(Cart);
export default ProtectedCart;