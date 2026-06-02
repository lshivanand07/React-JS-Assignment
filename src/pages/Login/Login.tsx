import React, { useState } from 'react'
import fetchLoginDetails from '../../services/loginApi'
import './Login.css'
import ErrorHandling from '../../components/ErrorHandle/Error'
import Loader from '../../components/Loader/Loader'
import { Navigate } from 'react-router-dom'
function Login () {

const [authenticated , setAuthenticated] = useState<boolean>(false)
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')
const [message, setMessage] = useState<string>('')
const [serverError, setServerError] = useState<boolean>(false)
const [loading, setLoading] = useState(false)

 const handleLogin = async (event: React.SyntheticEvent<HTMLElement>) => {

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
    } else {
      setMessage(data.message)
    }
  }
 catch (error) {
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

 function renderContent(){
  if(loading){
    return <Loader />
  }

  if(serverError){
   return <ErrorHandling message={message} /> 
  }

  if(authenticated){
    console.log("token: ", localStorage.getItem("token"))
     return <Navigate to="/" replace />;
  }
 }

  return (
    <>
    {
      renderContent()
    }
    { 

        !loading && !serverError && !authenticated && (
        <form className='login-div'>
          <h1>Login</h1>
         <label htmlFor="email">Email *: </label>
         <input type="text" id='email' value={email} placeholder='Enter Email'  onChange={(event)=>setEmail(event.target.value)}/>
         <label htmlFor="password">Password *: </label>
         <input type="password" id="password" value={password} placeholder='Enter Password'  onChange={(event)=>setPassword(event.target.value)} />
         <button onClick={handleLogin} disabled={loading} >Login</button>
         <p className="error">{message}</p>
        </form>
        )
    }
    </>
  )
}

export default Login