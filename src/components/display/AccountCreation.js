import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import * as yup from "yup"


import { AuthContext } from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext'
import { UserProvider } from '../../context/Provider'
import GradientButton from '../common/GradientButton'
const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('First name is required.'),
    lastName: yup
      .string()
      .required('Last name is required.'),
    username: yup
      .string()
      .required('Username is required.')
      .min(5, 'Username must be at least 5 characters long.'),
    email: yup
      .string()
      .required('Email is required.')
      .email('Email must be a valid email address.'),
    password: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters long.')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/,
        'Password must contain: numbers, uppercase, lowercase letters and special characters'
      ),
    confirm_password: yup
      .string()
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      }),
  });

const RegistrationForm = () => {
  // establishing state in component
  const authContext = useContext(AuthContext)
  const [ loginLoading, setLoginLoading ] = useState(false)
  const [banner, setBanners] = useState(null)
  const [errors, setErrors] = useState({})
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const navigate = useNavigate()
  const API_URL = process.env.REACT_APP_API_URL 

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  

  const handleInputChange = (event) => {
      setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      })
  }

  const sendForm = async (form) => {
    const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers:{
            "Content-Type": "application/json"
            },
        credentials: "include",
        body: JSON.stringify(form)
    }
    try{
        const response = await fetch(`${API_URL}/registration`, options)
        const data = await response.json()
        console.log("data: ",data.message)
        
        // wait for response indication of 
        if (data.message === "User already exists") {
          setBanners("I'm sorry but this user already exists!")
        } else if (data.message === "this Email is already in use.") {
          setBanners("Im sorry but this Email is already in use.")
        } else if (data.message === "User created") {
          try{
            setBanners("User Created Successfully!")
            setTimeout(() => {
              // setRedirectOnLogin(true)
              navigate('/main')
              window.location.reload()
            }, 1000)
        } catch (error){}
        }else {
          setBanners("An unexpected error occurred");
        }
        return data
    } catch(error){
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    schema
        .validate(formState, { abortEarly: false })
        .then(() => {
        // If the form is valid, we can send it to the server
        sendForm(formState)
        })
        .catch((err) => {
        // If the form is invalid, we can show the validation errors
        const errorMessages = err.inner.reduce(
            (errors, error) => ({
            ...errors,
            [error.path]: error.message,
            }),
            {}
        )
        setErrors(errorMessages);
        setBanners(Object.values(errors).join(", "))
        })
  };

  return (
    <div>
      {banner && <div className="topBanner">{banner}</div>}
    <form onSubmit={handleSubmit}>
    <label>
        First name:
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <label>
        Last name:
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirm_password"
          value={formState.confirm_password}
          onChange={handleInputChange}
        />
      </label><br/><br/>
      <GradientButton 
        type="submit" 
        text="register"
        loading={loginLoading}
      />
    </form>
    </div>
  );
}

export default RegistrationForm;
