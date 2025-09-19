import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import { fetchAuth } from './utils'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [usernameGlobal, setUsernameGlobal] = useState('')

  useEffect(() => {
    fetchAuth(setIsAuthenticated, setUsernameGlobal)
  }, [isAuthenticated, usernameGlobal])

  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} usernameGlobal={usernameGlobal} setUsernameGlobal={setUsernameGlobal} />
      <Outlet context={[isAuthenticated, setIsAuthenticated, usernameGlobal, setUsernameGlobal]}/>
      <Footer />
    </>
  )
}

export default App
