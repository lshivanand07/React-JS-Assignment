import Button from "../../components/Buttons/Button"
import { useState } from "react";
import { createUserAddress } from "../../services/addressApi";
import './Address.css'
import withErrorHandling from "../../hoc/withErrorHandling";
import withLoader from "../../hoc/withLoader";
import { useNavigate } from "react-router-dom";

interface AddreessesProps {
    insertUserAddress : ()=> void; resetForm : () => void
    country: string ; setCountry: (value: string) => void
    state: string ;    setState: (value: string) => void
    district: string ; setDistrict : (value: string) => void
    city: string ;     setCity : (value: string) => void
    street: string ;  setStreet : (value: string) => void
    landmark : string ; setLandmark: (value: string) => void
    pincode: string ;  setPincode : (value: string) => void
    addressType: string ; setAddressType : (value: string) => void
}

const Addresses = ({insertUserAddress, resetForm, country, setCountry, state, setState, district, setDistrict, city, setCity, street, setStreet, landmark, setLandmark, pincode, setPincode, addressType, setAddressType}:AddreessesProps) => {
    
  return(
  <>
     <h3>Manage Addresses</h3>
      <div className="add-address-div">
       <h4 className="add-new-address">ADD A NEW ADDRESS</h4>
        <form className="address-input">
        <select value={country} onChange={(event)=>setCountry(event.target.value)}>
            <option value='' disabled >Select your Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="australia">australia</option>
        </select>
        <select value={state} onChange={(event)=>setState(event.target.value)}>
            <option value='' disabled >Select your State</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Goa">Goa</option>
            <option value="Delhi">Delhi</option>
        </select>
        <select value={district} onChange={(event)=>setDistrict(event.target.value)}>
            <option value='' disabled >Select your District</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Bagalkot">Bagalkot</option>
            <option value="Mysore">Mysore</option>
            <option value="Belagavi">Belagavi</option>
        </select>
        <input type="text" value={city} onChange={(event)=>setCity(event.target.value)} placeholder="Enter your city" />
        <input type="text" value={street} onChange={(event)=>setStreet(event.target.value)} placeholder="Enter your Street"  />
        <textarea className="landmark" rows={4} cols={10} value={landmark}  onChange={(event)=>setLandmark(event.target.value)} placeholder="Enter your Landmark"></textarea>
        <input type="text" value={pincode} onChange={(event)=>setPincode(event.target.value)} placeholder='Enter your pincode' maxLength={6} />
        <div>
            Address type
            <div className="address-radio-Btn">
            <input type="radio" id="HOME" name="locationTypeTag" value='HOME'  checked={addressType === "HOME"} onChange={(event)=> setAddressType(event.target.value) }/>
            <label htmlFor="HOME">Home</label>
            <input type="radio" id="work" name="locationTypeTag" value='WORK' checked={addressType === "WORK"} onChange={(event)=> setAddressType(event?.target.value) }/>
            <label htmlFor="work">Work</label>
        </div>
        </div>
        </form>
         <div className="address-save-cancel-btn">
            <Button text="Save" onClick={(insertUserAddress)}></Button>
           <Button text="Cancel" onClick={(resetForm)}></Button>
         </div>
      </div>
  </>
  )

}

const EnhancedAddresses = withLoader(withErrorHandling(Addresses))

function AddressContainer () {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)
    const [serverError, setServerError] = useState<Error | null>(null);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [addressType, setAddressType] = useState('');

    const insertUserAddress = async ()=>{
      try{
       setLoading(true)
       console.log({
  country,
  state,
  district,
  city,
  street,
  landmark,
  pincode,
  addressType
});
       const data = await createUserAddress(country, state, district, city, street, landmark, pincode, addressType)
       alert(data.message)
       navigate('/address')
      }
      catch(error){
        setServerError(error as Error)
      }
      finally{
     setLoading(false)
      }
    }

    function resetForm (){
        setCountry('');
        setState('');
        setDistrict('');
        setCity('');
        setStreet('');
        setLandmark('');
        setPincode('');
        setAddressType('');
    }

  return(
    <EnhancedAddresses
    insertUserAddress = {insertUserAddress} resetForm = {resetForm}
    loading = {loading}
    serverError = {serverError}
    country = {country} setCountry = {setCountry}
    state = {state}    setState = {setState}
    district = {district} setDistrict = {setDistrict}
    city = {city}     setCity = {setCity}
    street = {street}   setStreet = {setStreet}
    landmark = {landmark}  setLandmark = {setLandmark}
    pincode = {pincode}  setPincode = {setPincode}
    addressType = {addressType} setAddressType = {setAddressType}
    />
  )
}

export default AddressContainer