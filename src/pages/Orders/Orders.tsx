import './Orders.css';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { userOrders } from '../../services/ordersApi';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';
import { checkoutOrder } from '../../services/checkoutApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderItem } from '../../redux/slices/orderSlice';

interface OrdersProps {
  orderData: any[];
  message: string;
  navigate: any;
  handlePlaceOrder: () => void;
  handleCancelOrder: () => void;
  handleConfirmOrder: () => void;
  handlePaymentMethod: () => void;
  checkoutData: {
    payment_method_name: string;
    address_status: string;
  };
  setCheckoutData: ({ value }: any) => void;
  showPaymentMethodChoice: boolean;
  addressData: any[];
  orderTotalAmount: number;
}

function Orders({
  orderData,
  message,
  navigate,
  handleCancelOrder,
  handleConfirmOrder,
  checkoutData,
  setCheckoutData,
  showPaymentMethodChoice,
  addressData,

  orderTotalAmount,
}: OrdersProps) {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="orders">
          <h1 className="orders-heading">Orders</h1>
          {!showPaymentMethodChoice && (
            <div className="order-items">
              {orderData?.map((items: any) => (
                <div className="items-cards">
                  <h3>Product Name: {items?.product_name}</h3>
                  <p>Description: {items.description}</p>
                  <p>quantity: {items.quantity}</p>
                  <p>price: ₹{items.price}</p>
                  <p>Order Status: {items.order_status}</p>
                  <p>Order Date: {items.order_date}</p>
                  <p>
                    Address: {items.state} {items.districts} {items.city}
                  </p>
                  <p>
                    {' '}
                    {items.landmark} {items.pincode}
                  </p>
                  <p>Tax: 5%</p>
                  <p>
                    Discount percentage:{' '}
                    {items.discount_percentage ? items.discount_percentage : 0}{' '}
                    %
                  </p>
                  <p>Total Amount: ₹{items.total_amount}</p>
                </div>
              ))}
            </div>
          )}

          {showPaymentMethodChoice && (
            <>
              <div className="overlay">
                <div className="total-price">
                  <h3>Total Price: {orderTotalAmount}</h3>
                </div>
                <select
                  value={checkoutData.payment_method_name}
                  onChange={(event) =>
                    setCheckoutData((prev: any) => ({
                      ...prev,
                      payment_method_name: event?.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    -- Select Payment Method --
                  </option>
                  <option value="COD">COD</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">CARD</option>
                  <option value="Netbanking">Netbanking</option>
                  <option value="Wallet">Wallet</option>
                </select>

                <div className="order-addresses">
                  {addressData[0] ? (
                    addressData.map((data) => (
                      <div
                        className={`order-address-card ${checkoutData.address_status === data.user_address_status ? 'selected-address' : ''}`}
                        onClick={() =>
                          setCheckoutData((prev: any) => ({
                            ...prev,
                            address_status: data.user_address_status,
                          }))
                        }
                      >
                        <h3 className="user-address-status">
                          {data.user_address_status} Address
                        </h3>
                        <p>
                          {data.country} {data.state}
                        </p>
                        <p>
                          {data.districts} {data.city}
                        </p>
                        <p>{data.street}</p>
                        <p>{data.landmark}</p>
                        <p>{data.pincode}</p>
                      </div>
                    ))
                  ) : (
                    <Button
                      text="Add order address"
                      onClick={() => navigate('/address')}
                    ></Button>
                  )}
                </div>
                <div className="order-confirm-cancel-btn">
                  <button onClick={handleConfirmOrder}>Confirm</button>
                  <button onClick={handleCancelOrder}>Cancel</button>
                </div>
                <p className="error">{message}</p>
              </div>
            </>
          )}

          {message && (
            <div className="empty-cart-div">
              <h3>{message}</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

const EnhancedOrders = withErrorHandling(withLoader(Orders));

function OrdersContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderTotalAmount = location.state?.total_price || 0;
  const orderRequireDetails = location.state?.showPaymentMethodChoice || false;

  const [serverError, setServerError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentMethodChoice, setShowPaymentMethodChoice] =
    useState(orderRequireDetails);
  const [checkoutData, setCheckoutData] = useState({
    payment_method_name: '',
    address_status: '',
  });
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const orderData = useSelector((state: any) => state.order.orderItem);
  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setShowPaymentMethodChoice(false);
      const orderData = await userOrders();
      console.log(orderData);
      setMessage(orderData.message);
      dispatch(setOrderItem(orderData[0]));
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  if (!orderRequireDetails) {
    useEffect(() => {
      fetchUserOrders();
    }, []);
  }

  const addressData = useSelector((state: any) => state.address.addressItem);

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      if (!addressData[0]) {
        navigate('/address');
      }
      const data = await checkoutOrder(checkoutData);
      alert(data.message);
      setMessage(data.message);
      fetchUserOrders();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    navigate('/cart');
  };

  return (
    <EnhancedOrders
      serverError={serverError}
      loading={loading}
      navigate={navigate}
      orderData={orderData}
      message={message}
      handleCancelOrder={handleCancelOrder}
      handleConfirmOrder={handleConfirmOrder}
      setCheckoutData={setCheckoutData}
      checkoutData={checkoutData}
      showPaymentMethodChoice={showPaymentMethodChoice}
      addressData={addressData}
      orderTotalAmount={orderTotalAmount}
    />
  );
}

export default OrdersContainer;
