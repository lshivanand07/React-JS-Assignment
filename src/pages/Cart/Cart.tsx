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
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../redux/slices/cartSlice';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

interface CartListProps {
  cartItems: any[];
  message: string;
  deleteCartItems: ({ productID, veriantID }: any) => void;
  placeOrders: (value: number) => void;
  PopupModel: () => void;
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  setSelectedItem: ({ productId, variantId }: any) => void;
}

const CartDataList = ({
  cartItems,
  message,
  deleteCartItems,
  placeOrders,
  PopupModel,
  showPopup,
  setShowPopup,
  setSelectedItem,
}: CartListProps) => {
  const totalPrice = cartItems[0]?.reduce((total: number, item: any) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs />
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
                      onClick={() => {
                        setShowPopup(true);
                        setSelectedItem({
                          productID: item.product_id,
                          variantID: item.variant_id,
                        });
                      }}
                    ></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="palce-order-btn">
              <h2 className="cart-totalPrice">₹ {totalPrice}</h2>
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

        {showPopup && (
          <div className="model-overlay">
            <div className="modal-container">
              {!message && (
                <>
                  <h4>Are you sure you want to delete this item?</h4>
                  <div className="userConformationBtn">
                    <Button text="Ok" onClick={deleteCartItems}></Button>
                    <Button text="cancel" onClick={PopupModel}></Button>
                  </div>
                </>
              )}

              {message && (
                <>
                  <h4>{message}</h4>
                  <Button text="Ok" onClick={PopupModel}></Button>
                </>
              )}
            </div>
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

  const [serverError, setServerError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  interface SelectedItem {
    productID: number;
    variantID: number;
  }

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItem);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const data = await fetchCartDetails();
      dispatch(setCart(data));
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

  async function deleteCartItems() {
    try {
      setLoading(true);
      if (!selectedItem) {
        return;
      }
      const data = await deleteCartItem(selectedItem);
      console.log('delete');
      setShowPopup(true);
      setMessage(data.message);
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

  function PopupModel() {
    setShowPopup(false);
    fetchCartItems();
  }

  return (
    <EnhancedCartList
      loading={loading}
      serverError={serverError}
      cartItems={cartItems}
      message={message}
      deleteCartItems={deleteCartItems}
      placeOrders={placeOrders}
      PopupModel={PopupModel}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      setSelectedItem={setSelectedItem}
    />
  );
};

export default CartDataContainer;
