import './Orders.css'
import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { userOrders } from "../../services/ordersApi"
import withLoader from '../../hoc/withLoader'
import withErrorHandling from '../../hoc/withErrorHandling'
import { checkoutOrder } from '../../services/checkoutApi'
import { useLocation, useNavigate } from 'react-router-dom'

interface OrdersProps {
   userData : any[]
  message: string;
  handlePlaceOrder: () => void;
  handleCancelOrder: () => void;
  handleConfirmOrder: () => void;
  handlePaymentMethod : ()=> void
  paymentMethodValue:string;  setPaymentMethodValue: (value:string)=>void
  showPaymentMethodChoice: boolean
}

function Orders ({userData, message, handleCancelOrder, handleConfirmOrder, paymentMethodValue , setPaymentMethodValue , showPaymentMethodChoice}:OrdersProps) {

   return(
      <div className="container">
       <Navbar/>
        <div className="orders">
          <h1 className="orders-heading">Orders</h1>
          {!showPaymentMethodChoice && (
               <div className='order-items'>
             {
            userData?.map((items:any)=>(
                <div className='items-cards'>
          <h3>User_id: {items.user_id}</h3>
          <h3>Product Name: {items?.product_name}</h3>
          <p>Order_id: {items.order_id}</p>
          <p>Description: {items.description}</p>
          <p>quantity: {items.quantity}</p>
          <p>price: ₹{items.price}</p>
          <p>Order Status: {items.order_status}</p>
          <p>Order Date: {items.order_date}</p>
          <p>Address_id: {items.address_id}</p>
          <p>Tax: 5%</p>
          <p>Discount_percentage: {items.discount_percentage}%</p>
          <p>Total Amount: ₹{items.total_amount}</p>
                </div>
            ))
         }
          </div>
             )
          }

          { showPaymentMethodChoice && (
        <div className="overlay">
          <select value={paymentMethodValue} onChange={(event)=>setPaymentMethodValue(event?.target.value)}>
            <option value="" disabled >-- Select Payment Method --</option>
            <option value="COD">COD</option>
            <option value="UPI">UPI</option>
            <option value="CARD">CARD</option>
            <option value="Netbanking">Netbanking</option>
            <option value="Wallet">Wallet</option>
          </select>
          <div className='order-confirm-cancel-btn'>
          <button onClick={handleConfirmOrder} >Confirm</button>
         <button onClick={handleCancelOrder}>Cancel</button>
          </div>
          <p className="error">{message}</p>
          </div>
      )
    }

       </div>
       <Footer/>
      </div>
   )
}

const EnhancedOrders = withErrorHandling(withLoader(Orders))

function OrdersContainer () {
    const navigate = useNavigate();
     const location = useLocation();
    const paymentMethodState = location.state?.showPaymentMethodChoice || false;

     const [serverError, setServerError] = useState<Error | null >(null)
    const [loading, setLoading] = useState(false)
   const [userData, setUserData] = useState<any>(null)
  const [showPaymentMethodChoice, setShowPaymentMethodChoice] = useState(paymentMethodState)
    const [paymentMethodValue, setPaymentMethodValue] = useState('')
    const [message, setMessage] = useState('')


    const fetchUserOrders = async()=>{
     try{
      setLoading(true)
      setShowPaymentMethodChoice(false)
     const data =  await userOrders();
     setUserData(data[0]) 
     }
     catch(error){
     setServerError(error as Error)
     }
     finally{
       setLoading(false)
     }
}

if(!paymentMethodState){
   useEffect(()=>{fetchUserOrders();},[])
}


  const handleConfirmOrder = async() => {
    try{
        setLoading(true)
        const data = await checkoutOrder(paymentMethodValue)
        alert(data.message)
        setMessage(data.message)
        if(data.message === 'Address not found'){
           return navigate('/address')
        }
           return navigate('/orders')
    }
   catch (error) {
    } finally {
      setLoading(false);
    }
  };

    const handleCancelOrder = () => {
    navigate('/cart')
  };

   return (
      <EnhancedOrders
      serverError = {serverError}
      loading = {loading}
      userData = {userData}
  message={message}
  handleCancelOrder={handleCancelOrder}
  handleConfirmOrder={handleConfirmOrder}
  paymentMethodValue = {paymentMethodValue} setPaymentMethodValue = {setPaymentMethodValue}
  showPaymentMethodChoice = {showPaymentMethodChoice}
      />
   )
}

export default OrdersContainer