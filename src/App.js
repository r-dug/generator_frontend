// npm modules
import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client'

// internal components
import { UserContext } from './context/UserContext'
import { UserProvider } from './context/Provider'
import Login from './context/Login'
import RegistrationForm from './context/AccountCreation'
import Main from './components/display/Main'
import PrivateRoute from './PrivateRoute'

// we will want to create a config file to the actual socket connection url upon launch
const SOCK_URL = process.env.REACT_APP_SOCK_URL || 'WSS://localhost'

const App = () => {
  const socket = io(`${SOCK_URL}:8000`)
  const Navigation = () => {
    const { user, setUser } = useContext(UserContext)
    console.log(user)
    return (
      <nav>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <Link to="/main">Main</Link>}
        {user && <button onClick={() => {setUser(null); socket.emit('logout', user)}}>Logout</button>}
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
        <Route path="/main"element={<PrivateRoute><Main /></PrivateRoute>} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
