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
    var Cookies = document.cookie.split(';');
      // function to show cookies
      function showCookies() {
        var show = document.getElementById("show");
        show.innerHTML = document.cookie;
     }
    // set 1 Jan, 1970 expiry for every cookies
    for (var i = 0; i < Cookies.length; i++)
    document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
    showCookies();
 }
  const sessionCookie = Cookies.get('session')
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
