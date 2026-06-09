import './MyProfile.css'
import { fetchUserById } from "../../services/userApi"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer" 
import prsonImage from '../../assets/person.png'
import noAddressFound  from '../../assets/noAddressFound.png'
import Button from '../../components/Buttons/Button'
import { useNavigate } from 'react-router-dom'
import { fetchUserAddressById } from '../../services/addressApi'
import  withLoader from '../../hoc/withLoader'
import  withErrorHandling from '../../hoc/withErrorHandling'
import AddressContainer from '../Addresses/Address'

interface MyProfileProps {
activeTab : string; setActiveTab: (value:string)=> void
fetchUserInfo: ()=> void
fetchAddressInfo : ()=> void
handleLogout: () => void
userData : any;
addressData :  any;
}

function MyProfile ({activeTab, setActiveTab, fetchUserInfo, fetchAddressInfo, handleLogout, userData, addressData}:MyProfileProps) {
    
    // const navigate = useNavigate()

    return(
        <>
         <>
       <div>
         <Navbar/>
         <div className="container">
        <div className='dashboard'>
            <div className='dashboard-buttons'>
                <div className='person-name-img'>
                    <img src={prsonImage} alt="person Img" />
                   <h3>{userData?.user_name}</h3>
                </div>
            <Button text='Personal Info' onClick={fetchUserInfo}></Button>
            <Button text='Addresses' onClick={(fetchAddressInfo)}></Button>
            <Button text='Logout' onClick={handleLogout}></Button>
            </div>
      
      <div className='dashboard-info'>
   
       { activeTab === 'profile' && userData  && (
            <>
          <h1 className="dashboard-info-heading">My Profile</h1>
           <h3>User_id: {userData?.User_id}</h3>
          <p>Email: {userData?.email}</p>
          <p>DOB: {userData?.dob}</p>
          <p>age: {userData?.age}</p>
          <p>Gender: {userData?.gender}</p>
          <p>phone: {userData?.phone}</p>
          <p>role: {userData?.role}</p>
            </>
          )
       }

        {activeTab === 'address' && addressData  && (
        <>
          <h1 className='dashboard-info-heading'>My Address</h1>
          <p>Address ID: {addressData?.address_id}</p>
          <p>Address Status: {addressData?.user_address_status}</p>
          <p>country: {addressData?.country}</p>
          <p>State: {addressData?.state}</p>
          <p>Districts: {addressData?.districts}</p>
          <p>City: {addressData?.city}</p>
          <p>Street: {addressData?.street}</p>
          <p>Landmark: {addressData?.landmark}</p>
          <p>Pincode: {addressData?.pincode}</p>
        </>
         )}

         { activeTab === 'address' && !addressData && (
            <>
              <div className='no-addresses-found'>
                <img src={noAddressFound} alt="person Img"/>
              <h3>No Addresses found in your account!</h3>
              <p>Add a delivery address.</p>
             <Button text='ADD ADDRESSES' onClick={()=>setActiveTab('addNewAddress')}></Button>
              </div>
            </>
         )
         }

         {
            activeTab === 'addNewAddress' && (
                <>
                <AddressContainer />
                </>
            )
         }
            </div>
        </div>
         </div>
          <Footer/>
       </div>
       </>
        </>
    )
}

const EnhancedMyProfile = withLoader(withErrorHandling(MyProfile))

function MyProfileContainer (){

    const navigate = useNavigate()
    
    const [serverError, setServerError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)
   const [userData, setUserData] = useState<any>(null)
   const [addressData, setAddressData] = useState<any>(null)
   const [activeTab, setActiveTab] = useState<'profile' | 'address' | 'addNewAddress'>('profile');
    
    const fetchUserInfo = async()=>{
        try{
        setLoading(true)
        const data = await fetchUserById();
        console.log(data[0][0])
         setUserData(data[0][0])
        setActiveTab('profile')
         navigate('/profile')
     }
    catch(error){
     setServerError(error as Error)
    }
     finally{
    setLoading(false)
    }
    }

  useEffect(()=>{fetchUserInfo();}, [])

    const fetchAddressInfo = async() =>{
       try{
       setLoading(true)
         const data = await fetchUserAddressById()
         console.log(data[0][0])
         setAddressData(data[0][0])
         setActiveTab('address')

         if(!data[0][0]){
            setAddressData(null)
            setActiveTab('address')
         }
         navigate('/address')
       }
       catch(error){
     setServerError(error as Error)
    }
     finally{
    setLoading(false)
    }
    }

    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


    return (
    <EnhancedMyProfile
      serverError = {serverError}
      loading = {loading}
      activeTab = {activeTab}
      setActiveTab = {setActiveTab}
      fetchUserInfo = {fetchUserInfo}
      fetchAddressInfo = {fetchAddressInfo}
      handleLogout = {handleLogout}
      userData = {userData}
      addressData = {addressData}
    />

    )
}


export default MyProfileContainer