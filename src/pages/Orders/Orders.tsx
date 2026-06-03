import './Orders.css'
import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import withAuth from "../../hoc/withAuth"
import { userOrders } from "../../services/ordersApi"
import Loader from "../../components/Loader/Loader"
import ErrorHandling from "../../components/ErrorHandle/Error"

function Orders () {
     const [serverError, setServerError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState<string>('')
   const [userData, setUserData] = useState<any>(null)

    const fetchUserOrders = async()=>{
     try{
        setLoading(true)
     const data =  await userOrders();
     console.log(data[0])
     setUserData(data[0]) 
     }
     catch(error){
     setServerError(true)
     if(error instanceof TypeError){
        setMessage(error.message)
     }else if(error instanceof Error){
        setMessage(error.message)
     }else{
        setMessage('Something went wrong')
     }
     }
     finally{
       setLoading(false)
     }
}

useEffect(()=>{fetchUserOrders();},[])

    
 if(loading){
    return <Loader/>
 }

 if(serverError){
    return <ErrorHandling message={message}/>
 }

   return (
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

const protectedOrders = withAuth(Orders)
export default protectedOrders