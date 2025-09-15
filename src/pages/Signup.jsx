const Signup = () => {
  return (
    <main>
      <h1>Sign Up Here</h1>
      <form action="/signup" method="post">
        <h2>Create a new account</h2>
       <label htmlFor="firstname">First Name</label>
            <input id="firstname" name="firstname" placeholder="Bruce" type="text" required />
            <label htmlFor="lastname">Last Name</label>
            <input id="lastname" name="lastname" placeholder="Wayne" type="text" required />
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="bruce.wayne" type="text" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required/>
            <div className="sign-up-password-info">Min 8 characters, numbers & letters</div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password" name="confirmPassword" type="password" required/>
            <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default Signup;