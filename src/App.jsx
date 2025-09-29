import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [loggedUsername, setLoggedUsername] = useState('')

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8100'

  async function fetchAuth() {
    const token = localStorage.getItem('jwtToken')
    if(token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200) {
          setLoggedUsername(response.data.username)
        }
      } catch (err) {
        localStorage.clear()
        console.error("You're logged out. Please login again.")
      }
    } else {
        console.log('not authenticated')
    }
}

  useEffect(() => {
    fetchAuth()
  }, [loggedUsername])

  return (
    <>
      <Header loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername}/>
      <Outlet context={[loggedUsername, setLoggedUsername]}/>
      <Footer />
    </>
  )
}

export default App
