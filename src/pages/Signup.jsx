import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './Signup.css'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    }
    const response = await axios.post('/api/signup', newUser)
    console.log(response)
    if(response.status === 201)
      navigate('/')
  }

  return (
    <main>
      <form action="/signup" method="post" onSubmit={handleSignup} className="signup-form">
        <h1>Create a new account</h1>
        <label htmlFor="firstname">First Name</label>
        <input id="firstname" name="firstname" placeholder="Bruce" type="text" onChange={(e) => setFirstName(e.target.value)} required />
        <label htmlFor="lastname">Last Name</label>
        <input id="lastname" name="lastname" placeholder="Wayne" type="text" onChange={(e) => setLastName(e.target.value)} required />
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="bruce-wayne" type="text" onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="brucewayne@gothammail.com" type="email" onChange={(e) => setEmail(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
        <div className="sign-up-password-info">Min 8 characters, numbers & letters</div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input id="confirm-password" name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default Signup;