
import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from "react-router-dom"
// import io from 'socket.io-client'

const Login = () => { 
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'
  const SOCK_URL = process.env.REACT_APP_SOCK_URL || 'ws://localhost:8000'
  const [banner, setBanners] = useState(null);
  // const socket = io(`${SOCK_URL}:8002`)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  console.log(API_URL, SOCK_URL)
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const loginAttempt = async (script, valueupdate) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
          username: username,
          password: password,
      }),
      headers:{
        "Content-Type": "application/json"
      }
    }
    try{
      console.log(API_URL)
      const response = await fetch(`${API_URL}/login`, options)
      const data = await response.json()
      console.log(data)
      if (data.message === "Login Successful") {
        setUser(data.user)
        // socket.emit('login', data.user)
        setBanners("Congrats. Login successful.")
        navigate('/main')
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
      </label>
      <label className='pWord'>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <input type="submit" value="Log In" />
    </form>
    </div>
  )
}
export default Login