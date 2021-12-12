import React,{useState } from "react";
import Profile from "./Profile"
const Logger = ()=>{
    
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('jwtWebToken');
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
    
    // Handling the email change
    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };
    
    // Handling the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email === '' || password === '') {
        setError(true);
      } else {
          const url="/api/login";
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email,password })
        };
        fetch(url, requestOptions)
            .then(response=>response.json())
            .then((data)=>setToken(data.jsonWebToken))
            .catch(error => console.log('Form submit error', error))
      }
        }
    
    // Showing success message
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: submitted ? '' : 'none',
          }}>
          <h1>Log In</h1>
        </div>
      );
    };
    
    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: error ? '' : 'none',
          }}>
          <h1>Please enter all the fields</h1>
        </div>
      );
    };
    
    return (
      <div>
        <div>
          <h1>Login</h1>
        </div>
    
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
    
        <form  className="form" method="POST" onSubmit={handleSubmit}>
          {/* Labels and inputs for form data */}
          <label className="label" for="email">Email</label><br/>
          <input onChange={handleEmail} className="input" 
            value={email} type="email" id="email"/>
          <br/>
          <label className="label" for="password">Password</label><br/>
          <input onChange={handlePassword} className="input" 
            value={password} type="password" id="password" />
          <br/>
          <button className="btn" type="submit">
            Submit
          </button><br/>
          <Profile jsonWebToken={token}/>
        </form>
        
      </div>
    );
  }
  export default Logger;