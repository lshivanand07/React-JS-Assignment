import React, { useState } from "react"
import './Signup.css'
import Button from "../../components/Buttons/Button"
import signUp from "../../services/signUpApi"
import Loader from "../../components/Loader/Loader"
import ErrorHandling from "../../components/ErrorHandle/Error"
import { Navigate } from "react-router-dom"

function Signup(){

    const [userName, setUserName] = useState<any>('')
    const [userEmail, setUserEmail] = useState<any>('')
    const [userPassword, setUserPassword] = useState<any>('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string>('')
    const [serverError, setServerError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [registration, setRegistration] = useState(false)

    const userRegistration  = async (event: React.SyntheticEvent<HTMLElement>)=>{
        try{
            event.preventDefault()

          setLoading(true)
            if(!userName){
                return setMessage("Enter user name")
            }
            if(!userEmail){
                return setMessage("Enter Email")
            }
            if(!userPassword){
               return setMessage("Enter password")
            }
            if(!confirmPassword){
               return setMessage("Enter confirm password")
            }
            if(userPassword !== confirmPassword){
               return setMessage("password does not match.")
            }

            const data = await signUp(userName, userEmail, userPassword)
            alert(data.message)

            setRegistration(true)
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
        }finally{
         setLoading(false)
        }
    }

    function renderContent (){
        if(loading){
            return <Loader />
        }

        if(serverError){
         return <ErrorHandling message={message} /> 
        }

        if(registration){
         return <Navigate to="/" replace/>
        }
    }

     return(
        <>
        {
            renderContent()
        }
        {
            <div className="container">
            <form className="signup-div">
                <h1 className="sign-up-heading">Sign Up</h1>
                <label htmlFor="user_name">Name*: </label>
                <input type="text" id="user_name" value={userName}  onChange={(event)=>setUserName(event.target.value)} />
                 <label htmlFor="user_email">Email*: </label>
                <input type="email" id="user_email" value={userEmail}  onChange={(event)=>setUserEmail(event.target.value)} />
                 <label htmlFor="user_password">password*: </label>
                <input type="text" id="user_password" value={userPassword}  onChange={(event)=>setUserPassword(event.target.value)} />
                <label htmlFor="confirm_password">confirm password*: </label>
                <input type="text" id="confirm_password" value={confirmPassword}  onChange={(event)=>setConfirmPassword(event.target.value)} />
                <Button text="Sign Up" onClick={(userRegistration)}></Button>
                <p className="error">{message}</p>
            </form>
        </div>
        }
        </>
     )
}

export default Signup