import React,{useState } from "react";
const Logger = ()=>{
    
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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
        setSubmitted(true);
        setError(false);
      }
    };
    
    // Showing success message
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: submitted ? '' : 'none',
          }}>
          <h1>Logged In</h1>
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
      <div className="form">
        <div>
          <h1>Login</h1>
        </div>
    
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
    
        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Email</label><br/>
          <input onChange={handleEmail} className="input" 
            value={email} type="email" />
          <br/>
          <label className="label">Password</label><br/>
          <input onChange={handlePassword} className="input" 
            value={password} type="password" />
          <br/>
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button><br/>
        </form>
      </div>
    );
  }
  export default Logger;