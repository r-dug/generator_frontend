import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from "react-router-dom"
import io from 'socket.io-client'
// const API_URL = process.env.API_URL 
// const SOCK_URL = process.env.SOCK_URL || 'WSS://localhost'
const aws = require('aws-sdk');
let s3 = new aws.S3({
  API_URL: process.env.API_URL,
  SOCK_URL: process.env.SOCK_URL
});

const Login = () => {

  console.log("Variables:",API_URL, SOCK_URL)
  const socket = io(`${SOCK_URL}:8002`)
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
        password: password
    }),
    headers:{
        "Content-Type": "application/json"
    }
    }
    try{
      console.log(API_URL)
    const response = await fetch(`${API_URL}:8000/login`, options)
    const data = await response.json()
    console.log(data)
    if (data.message === "Login Successful") {
      setUser(data.user)
      socket.emit('login', data.user)
      navigate('/main')
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
  )
}
export default Login