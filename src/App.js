// npm modules
import React, { useContext, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

// internal components
import { UserContext } from './context/UserContext'
import { UserProvider } from './context/Provider'
import Login from './components/display/Login'
import RegistrationForm from './components/display/AccountCreation'
import Main from './components/display/Main'
import cookieCheck from './components/util/cookieCheck'

const App = () => {
  
  function deleteCookies() {
    Object.keys(Cookies.get()).forEach(function(cookieName) {
      var neededAttributes = {
        proxy: true,
        sameSite: 'none', // cross-site
        secure: true, // Set to true if using HTTPS
        httpOnly: false, // Prevent client-side JavaScript from accessing cookies
        maxAge: 1000*60*30, // Session expiration time (in milliseconds)
        domain: process.env.COOKIE_ALLOW,
        path: "/"
      };
      console.log(cookieName)
      Cookies.remove(cookieName, neededAttributes);
    });}

  const sessionCookie = Cookies.get('session')
  console.log(sessionCookie)
  const check = cookieCheck(sessionCookie)
  const Navigation = () => {
    return (
      <nav>
        {!sessionCookie && <Link to="/login">Login </Link>}
        {!sessionCookie && <br/>}
        {!sessionCookie && <br/>}
        {!sessionCookie && <Link to="/register">Register </Link>}

        {sessionCookie && <Link to="/main">Main </Link>}
        {sessionCookie && <br/>}
        {sessionCookie && <button onClick={() => {
          deleteCookies();
          window.location.reload()
          }}>Logout </button>}
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
