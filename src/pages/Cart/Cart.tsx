import { useEffect, useState } from 'react';
import {fetchCartDetails} from '../../services/cartApi';
import './Cart.css'
import Button from '../../components/Buttons/Button';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';
import { useNavigate } from 'react-router-dom';

interface CartListProps {
  cartItems: any[];
  placeOrders : ()=> void
}


const CartDataList = ({cartItems, placeOrders}: CartListProps) =>{

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
        <p>Discount_percentage: {item.discount_percentage}%</p>
        <div className='Edit-Delete-btn'> 
            <Button text="Edit" ></Button>
           <Button text="Delete" ></Button>
        </div>
      </div>
    ))}
    </div>
    <div className='palce-order-btn'>
        <Button text='PLACE ORDER' onClick={placeOrders}></Button>
    </div>
  </div>
  )
}

const EnhancedCartList = withLoader(withErrorHandling(CartDataList));



const CartDataContainer = () => {

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [serverError, setServerError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false)

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const data = await fetchCartDetails();
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

  function placeOrders () {
    navigate('/orders',{
      state:{
        showPaymentMethodChoice:true
      }
    })
  }

  return (
    <EnhancedCartList 
  loading={loading}
  serverError={serverError}
  cartItems={cartItems} 
  placeOrders = {placeOrders} />
  )
};

export default CartDataContainer


