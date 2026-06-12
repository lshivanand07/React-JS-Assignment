import { useEffect, useState } from 'react';
import { fetchCartDetails } from '../../services/cartApi';
import { deleteCartItem } from '../../services/cartApi';
import './Cart.css';
import Button from '../../components/Buttons/Button';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

interface CartListProps {
  cartItems: any[];
  message: string;
  deleteCartItems: ({ productID, veriantID }: any) => void;
  placeOrders: (value: number) => void;
}

const CartDataList = ({
  cartItems,
  message,
  deleteCartItems,
  placeOrders,
}: CartListProps) => {
  
  const totalPrice = cartItems[0]?.reduce((total: number, item: any) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <>
      <Navbar />
      <div className="container">
        {!message && (
          <>
            <h1 className="cart-heading">My Cart</h1>
            <div className="carts">
              {cartItems[0]?.map((item: any) => (
                <div className="cart">
                  <div className="product_img">
                    <img src={item.image_url} />
                  </div>
                  <h2>{item.product_name}</h2>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p className="uppercase">description: {item.description}</p>
                  <p>
                    Discount percentage:{' '}
                    {item.discount_percentage ? item.discount_percentage : 0}%
                  </p>
                  <div className="Edit-Delete-btn">
                    <Button
                      text="Delete"
                      onClick={() =>
                        deleteCartItems({
                          productID: item.product_id,
                          variantID: item.variant_id,
                        })
                      }
                    ></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="palce-order-btn">
              <Button
                text="PLACE ORDER"
                onClick={() => placeOrders(totalPrice)}
              ></Button>
            </div>
          </>
        )}
        {message && (
          <div className="empty-cart-div">
            <h3>{message}</h3>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const EnhancedCartList = withLoader(withErrorHandling(CartDataList));

const CartDataContainer = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const data = await fetchCartDetails();
      setCartItems(data);
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  async function deleteCartItems({ productID, variantID }: any) {
    try {
      setLoading(true);
      const data = await deleteCartItem({ productID, variantID });
      console.log('delete');
      alert(data.message);
      fetchCartItems();
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  }

  function placeOrders(totalPrice: number) {
    navigate('/orders', {
      state: {
        showPaymentMethodChoice: true,
        total_price: totalPrice,
      },
    });
  }

  return (
    <EnhancedCartList
      loading={loading}
      serverError={serverError}
      cartItems={cartItems}
      message={message}
      deleteCartItems={deleteCartItems}
      placeOrders={placeOrders}
    />
  );
};

export default CartDataContainer;
