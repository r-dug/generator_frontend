import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'

import GradientButton from '../common/GradientButton'


const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => { 

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'
  const [banner, setBanners] = useState(null);
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const [ loginLoading, setLoginLoading ] = useState(false)
  const loginAttempt = async (script, valueupdate) => {
    setLoginLoading(true)
    const options = {
      method: "POST",
      body: JSON.stringify({
          username: username,
          password: password,
      }),
      headers:{
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    try{
      const response = await fetch(`${API_URL}/login`, options)
      const data = await response.json()

      if (data.message === "Login Successful") {        
        setBanners("Congrats. Login successful.")
        setTimeout(() => {
          navigate('/main')
          window.location.reload()
        }, 1500);
        
      }else if (data.message === "Incorrect Password" || data.message === "Incorrect Uname") {
        setBanners("Improper credentials! try again or register a new account.")
      }
    return data
    } catch(error){
    console.error(error)
    }
}
  const handleSubmit = (event) => {
    event.preventDefault()
    loginAttempt()

  }
  return (
    <div>
    {banner && <div className="topBanner">{banner}</div>}
    <form className='login' onSubmit={handleSubmit}>
      <label className='uName'>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label><br/><br/>
      <label className='pWord'>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label><br/><br/>
      <GradientButton 
        type="submit" 
        text="LOGIN"
        loading={loginLoading}
      />
    </form>
    </div>
  )
}
export default Login