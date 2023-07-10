// npm modules
import React, { useState, useContext, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

// internal components
import { UserContext } from './context/UserContext'
import { UserProvider } from './context/Provider'
import Login from './components/display/Login'
import RegistrationForm from './components/display/AccountCreation'
import Main from './components/display/Main'
import deleteCookies from './components/CookieRemoval'
import GradientButton from './components/common/GradientButton'

const App = () => {

  let sessionCookie = Cookies.get('session')
  const [loginLoading, setLoginLoading] = useState(false)
  const Navigation = () => {
    return (
      <nav>
        {!sessionCookie && <Link to="/login">Login </Link>}
        {!sessionCookie && <br/>}
        {!sessionCookie && <br/>}
        {!sessionCookie && <Link to="/register">Register </Link>}

        {sessionCookie && <Link to="/main">Main </Link>}
        {sessionCookie && <br/>}
        {sessionCookie && <GradientButton 
        type="submit" 
        text="LOGOUT"
        loading={loginLoading}
        onClick={ () =>{
          setLoginLoading(true)
          deleteCookies()
          setLoginLoading(false)
          window.location.reload()
        }}
      />}

      </nav>
    )
  }

  return (
    <UserProvider>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<RegistrationForm />} />
        {sessionCookie ? (
          <Route path="/main" element={<Main />} />
        ) : (
          <Route path="/login" element={<Login />} /> 
        )}      
      </Routes>
    </Router>
    </UserProvider>
  )

}

export default App;
