import { useState } from "react";
import axios from "axios";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleLogin(e) {
    e.preventDefault()
    const loginAttemptUser = {
      username,
      password,
    }
    const response = await axios.post('/api/login', loginAttemptUser)
  }

  return (
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
  );
};

export default Login;