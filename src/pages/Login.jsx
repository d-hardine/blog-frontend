import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router"
import PageTitle from '../components/PageTitle'
import axios from "axios"
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loggedUsername, setLoggedUsername] = useOutletContext()

  const navigate = useNavigate()
  
  async function handleLogin(e) {
    e.preventDefault()
    const loginAttemptUser = {
      username,
      password,
    }
    const response = await axios.post('/api/login', loginAttemptUser)
    if(response.status === 200) {
      localStorage.setItem("jwtToken", response.data.token)
      //setLoggedUsername(response.data.username)
      navigate('/')
      window.location.reload(false);
    }
  }

  if(loggedUsername) {
    navigate('/')
  }

  return (
    <>
      <PageTitle title="Login to Blog" />
      <main>
        <form action="/signup" method="post" onSubmit={handleLogin} className="login-form">
          <h1>Login your account</h1>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="bruce-wayne" type="text" onChange={(e) => setUsername(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
};

export default Login;