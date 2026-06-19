import './MyProfile.css';
import { fetchUserById } from '../../services/userApi';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import prsonImage from '../../assets/person.png';
import notAddressFound from '../../assets/notAddressFound.png';
import Button from '../../components/Buttons/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUserAddressById } from '../../services/addressApi';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';
import AddressContainer from '../Addresses/Address';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../redux/slices/addressSlice';
import { setUser } from '../../redux/slices/userSlice';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

interface MyProfileProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  fetchUserInfo: () => void;
  fetchAddressInfo: () => void;
  EditUserAddress: (value: string) => void;
  handleLogout: () => void;
  userData: any;
  addressData: any[];
}

function MyProfile({
  activeTab,
  setActiveTab,
  fetchUserInfo,
  fetchAddressInfo,
  EditUserAddress,
  handleLogout,
  userData,
  addressData,
}: MyProfileProps) {
  return (
    <>
      <>
        <div>
          <Navbar />
          <div className="container">
            <div className="profile-dashboard">
              <div className="dashboard-buttons">
                <div className="person-name-img">
                  <img src={prsonImage} alt="person Img" />
                  <h3>{userData?.user_name}</h3>
                </div>
                <Button text="Personal Info" onClick={fetchUserInfo}></Button>
                <Button text="Addresses" onClick={fetchAddressInfo}></Button>
                <Button text="Logout" onClick={handleLogout}></Button>
              </div>

              <div className="dashboard-info">
                <Breadcrumbs />
                {activeTab === 'profile' && userData && (
                  <>
                    <h1 className="dashboard-info-heading">My Profile</h1>
                    <p>Email: {userData?.email}</p>
                    <p>DOB: {userData?.dob}</p>
                    <p>age: {userData?.age}</p>
                    <p>Gender: {userData?.gender}</p>
                    <p>phone: {userData?.phone}</p>
                    <p>role: {userData?.role}</p>
                  </>
                )}

                {activeTab === 'address' && addressData[0] && (
                  <>
                    <h1 className="dashboard-info-heading">My Address</h1>
                    <div className="user-addresses"></div>
                    {addressData.map((addressData) => (
                      <div className="address">
                        <p>
                          Address Status: {addressData?.user_address_status}
                        </p>
                        <p>country: {addressData?.country}</p>
                        <p>State: {addressData?.state}</p>
                        <p>Districts: {addressData?.districts}</p>
                        <p>City: {addressData?.city}</p>
                        <p>Street: {addressData?.street}</p>
                        <p>Landmark: {addressData?.landmark}</p>
                        <p>Pincode: {addressData?.pincode}</p>
                        <Button
                          text="Edit"
                          onClick={() =>
                            EditUserAddress(addressData?.user_address_status)
                          }
                        ></Button>
                      </div>
                    ))}
                    <Button
                      text="ADD ADDRESSES"
                      onClick={() => setActiveTab('addNewAddress')}
                    ></Button>
                  </>
                )}

                {activeTab === 'address' && !addressData[0] && (
                  <>
                    <div className="no-addresses-found">
                      <img src={notAddressFound} alt="person Img" />
                      <h3>No Addresses found in your account!</h3>
                      <p>Add a delivery address.</p>
                      <Button
                        text="ADD ADDRESSES"
                        onClick={() => setActiveTab('addNewAddress')}
                      ></Button>
                    </div>
                  </>
                )}

                {(activeTab === 'addNewAddress' ||
                  activeTab === 'editAddress') && (
                  <>
                    <AddressContainer />
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    </>
  );
}

const EnhancedMyProfile = withLoader(withErrorHandling(MyProfile));

function MyProfileContainer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [serverError, setServerError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'address' | 'addNewAddress' | 'editAddress'
  >('profile');

  const dispatch = useDispatch();
  const addressData = useSelector((state: any) => state.address.addressItem);

  const userData = useSelector((state: any) => state.user.userData);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const data = await fetchUserById();
      console.log(data[0][0]);
      dispatch(setUser(data[0][0]));
      setActiveTab('profile');
      navigate('/profile');
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressInfo = async () => {
    try {
      setLoading(true);
      const data = await fetchUserAddressById();
      dispatch(setAddress(data[0]));
      setActiveTab('address');
      navigate('/address');

      if (!data[0][0]) {
        setActiveTab('address');
      }
    } catch (error) {
      setServerError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/profile') {
      fetchUserInfo();
    } else {
      fetchAddressInfo();
    }
  }, []);

  function EditUserAddress(addressStatus: string) {
    setActiveTab('editAddress');
    navigate('/address', {
      state: {
        addressStatus: addressStatus,
      },
    });
    console.log('hi');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <EnhancedMyProfile
      serverError={serverError}
      loading={loading}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      fetchUserInfo={fetchUserInfo}
      fetchAddressInfo={fetchAddressInfo}
      EditUserAddress={EditUserAddress}
      handleLogout={handleLogout}
      userData={userData}
      addressData={addressData}
    />
  );
}

export default MyProfileContainer;
