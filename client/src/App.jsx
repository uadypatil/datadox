import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/user/Dashboard'
import Logout from './pages/logout'

// 2. Setup the Router configuration
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      {/* You can add more routes here, e.g., <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}

export default App
