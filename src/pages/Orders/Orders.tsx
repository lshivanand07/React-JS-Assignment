import './Orders.css'
import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { userOrders } from "../../services/ordersApi"
import withLoader from '../../hoc/withLoader'
import withErrorHandling from '../../hoc/withErrorHandling'

interface OrdersProps {
   userData : any[]
}

function Orders ({userData}:OrdersProps) {
   return(
      <div className="orders">
       <Navbar/>
        <div className="container">
          <h1 className="orders-heading">Orders</h1>
          <div className='order-items'>
             {
            userData?.map((items:any)=>(
                <div className='items-cards'>
          <h3>User_id: {items.user_id}</h3>
          <h3>Product Name: {items?.product_name}</h3>
          <p>Description: {items.description}</p>
          <p>quantity: {items.quantity}</p>
          <p>price: ₹{items.price}</p>
          <p>Order Status: {items.order_status}</p>
          <p>Order Date: {items.order_date}</p>
          <p>Address_id: {items.address_id}</p>
          <p>Total Amount: ₹{items.total_amount}</p>
                </div>
            ))
         }
          </div>
       </div>
       <Footer/>
      </div>
   )
}

const EnhancedOrders = withErrorHandling(withLoader(Orders))

function OrdersContainer () {
     const [serverError, setServerError] = useState<Error | null >(null)
    const [loading, setLoading] = useState(false)
   const [userData, setUserData] = useState<any>(null)

    const fetchUserOrders = async()=>{
     try{
        setLoading(true)
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

useEffect(()=>{fetchUserOrders();},[])

   return (
      <EnhancedOrders
      serverError = {serverError}
      loading = {loading}
      userData = {userData}
      />
   )
}

export default OrdersContainer