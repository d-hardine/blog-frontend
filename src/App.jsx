import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import { fetchAuth } from './utils'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetchAuth(setIsAuthenticated)
  }, [isAuthenticated])

  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Outlet context={[isAuthenticated, setIsAuthenticated]}/>
      <Footer />
    </>
  )
}

export default App
