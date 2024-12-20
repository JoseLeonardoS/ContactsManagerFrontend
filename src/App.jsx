import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'

import SignInCard from './components/user/SignInCard'
import SignUpCard from './components/user/SignUpCard'

function App() {

  useEffect(() => {
    test()
  }, [])

  function test() {
    console.log("Testou")
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignInCard />} />
        <Route path='/sign-up' element={<SignUpCard />} />
        <Route
          path='/dashboard'
          element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
