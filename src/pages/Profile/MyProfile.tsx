import './MyProfile.css'
import { fetchUserById } from "../../services/userApi"
import Loader from "../../components/Loader/Loader"
import { useEffect, useState } from "react"
import ErrorHandling from "../../components/ErrorHandle/Error"
import withAuth from "../../hoc/withAuth"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

function MyProfile (){
    

    const [serverError, setServerError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState<string>('')
   const [userData, setUserData] = useState<any>(null)
    
    const fetchUserInfo = async()=>{
        try{
        setLoading(true)
        const data = await fetchUserById();
        console.log(data[0][0])
         setUserData(data[0][0])
     }
    catch(error){
     setServerError(true)
        if (error instanceof TypeError) {
        setMessage(error.message)
        } else if (error instanceof Error) {
        setMessage(error.message)
        } else {
        setMessage('Something went wrong')
        }
    }
     finally{
    setLoading(false)
    }
    }

    useEffect(()=>{fetchUserInfo();}, [])

    if(serverError){
        return <ErrorHandling  message={message} />
    }
    
    if(loading){
        return <Loader/>
    }
    return (
       <>
       <div>
         <Navbar/>
         <div className="container">
      <h1 className="My-profile-heading">My Profile</h1>
      
       {userData && (
        <>
          <h3>Name: {userData?.user_name}</h3>
          <h3>User_id: {userData?.User_id}</h3>
          <p>Email: {userData?.email}</p>
          <p>DOB: {userData?.dob}</p>
          <p>age: {userData?.age}</p>
          <p>Gender: {userData?.gender}</p>
          <p>phone: {userData?.phone}</p>
          <p>role: {userData?.role}</p>
        </>
      )}
         </div>
          <Footer/>
       </div>
       </>
    )
}

const protectedMyprofile  = withAuth(MyProfile)
export default protectedMyprofile