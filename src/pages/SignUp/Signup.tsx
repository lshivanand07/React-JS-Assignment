import React, { useState } from "react"
import './Signup.css'
import Button from "../../components/Buttons/Button"
import validateSignup from "../../components/validations/validations"
import withLoader from "../../hoc/withLoader"
import withErrorHandling from "../../hoc/withErrorHandling"
import CreateUser from "../../services/signUpApi"
import { useNavigate } from "react-router-dom"

interface SignupProps {
    userRegistration: ()=>void
    message: string
    userName: string; setUserName: (value:string)=> void
    userEmail: string; setUserEmail: (value:string)=> void
    userPassword:string; setUserPassword: (value:string)=> void
    confirmPassword:string;  setConfirmPassword: (value:string)=> void
}

function Signup ({userRegistration, message, userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword, confirmPassword, setConfirmPassword}: SignupProps){
    return(
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
    )
}

const EnhancedSignup = withLoader(withErrorHandling(Signup))

function SignupContainer(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState<any>('')
    const [userEmail, setUserEmail] = useState<any>('')
    const [userPassword, setUserPassword] = useState<any>('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string>('')
    const [serverError, setServerError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const userRegistration  = async (event: React.SyntheticEvent<HTMLElement>)=>{
        try{
            event.preventDefault()
          setLoading(true)
          const error = validateSignup(userName, userEmail, userPassword, confirmPassword)
          console.log(error)
          if (error) {
            setMessage(error);
            return;
          }
        const data = await CreateUser(userName, userEmail, userPassword)
        alert(data.message)
        navigate('/')
        }
        catch(error){
          setServerError(true)
        }finally{
         setLoading(false)
        }
    }

     return(
        <EnhancedSignup 
        loading = {loading}
        serverError = {serverError}
        userRegistration = {userRegistration}
        message = {message}
        userName = {userName} setUserName = {setUserName}
        userEmail = {userEmail} setUserEmail = {setUserEmail}
        userPassword = {userPassword} setUserPassword = {setUserPassword}
        confirmPassword= {confirmPassword} setConfirmPassword = {setConfirmPassword}
        />
     )
}

export default  SignupContainer;
