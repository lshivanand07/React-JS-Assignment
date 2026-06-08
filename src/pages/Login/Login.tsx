import React, { useState } from 'react'
import fetchLoginDetails from '../../services/loginApi'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import withErrorHandling from '../../hoc/withErrorHandling'
import withLoader from '../../hoc/withLoader'

interface LoginProps {
  loading: boolean,
  serverError: null,
  authenticated: boolean,
  message: string,
  userLogin: ()=> void,
  email: string,
  password: string
  setEmail: (value:string)=> void
  setPassword: (value:string)=> void
}

function Login ({loading, serverError, authenticated, message, userLogin, email, setEmail, password, setPassword}:LoginProps){
return(
  !loading && !serverError && !authenticated && (
        <form className='login-div'>
          <h1>Login</h1>
         <label htmlFor="email">Email *: </label>
         <input type="text" id='email' value={email} placeholder='Enter Email'  onChange={(event)=>setEmail(event.target.value)}/>
         <label htmlFor="password">Password *: </label>
         <input type="password" id="password" value={password} placeholder='Enter Password'  onChange={(event)=>setPassword(event.target.value)} />
         <button onClick={userLogin} disabled={loading} >Login</button>
         <p className="error">{message}</p>
        </form>
        )
)
}

const EnhancedLogin  = withLoader(withErrorHandling(Login))


function LoginContainer () {

  const navigate = useNavigate()

const [authenticated , setAuthenticated] = useState<boolean>(false)
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')
const [message, setMessage] = useState<string>('')
const [serverError, setServerError] = useState<boolean>(false)
const [loading, setLoading] = useState(false)

 const userLogin = async (event: React.SyntheticEvent<HTMLElement>) => {

  try {
    event.preventDefault()

    setLoading(true)
    setServerError(false)
    if(!email || !password){
        setMessage('Email and Password fields are required')
        return
     }
    const data = await fetchLoginDetails(email, password)
    if (data.token) {
      setAuthenticated(true)
      localStorage.setItem("token", data.token);
      navigate('/')
    } else {
      setMessage(data.message)
    }
  }
 catch (error) {
  setServerError(true)
}
finally{
  setLoading(false)
}
 }
 
  return (
    <EnhancedLogin 
    loading = {loading}
    serverError = {serverError}
    authenticated = {authenticated}
    message = {message}
    userLogin = {userLogin}
    email = {email}
    setEmail = {setEmail}
    password = {password}
    setPassword = {setPassword}
    />
  )
}

export default LoginContainer