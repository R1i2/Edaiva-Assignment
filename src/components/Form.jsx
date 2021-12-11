import { useState } from 'react';
  
export default function Form() {
  
  // States for registration
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
  // Handling the fname change
  const handlefName = (e) => {
    setfName(e.target.value);
    setSubmitted(false);
  };
  //Handling the lname change
  const handlelName = (e) => {
    setlName(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  //Handling the phone change
  const handlePhone = (e)=>{
      setPhone(e.target.value);
      setSubmitted(false);
  }
  //handling the address change
  const handleAddress = (e)=>{
      setAddress(e.target.value);
      setSubmitted(false);
  }
  
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === '' || email === '' || password === '') {
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
        <h1>User {fname} {lname} successfully registered!!</h1>
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
        <h1>User Registration</h1>
      </div>
  
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
  
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">First Name</label>
        <input onChange={handlefName} className="input" 
          value={fname} type="text" />
        
        <label className="label">Last Name</label>
        <input onChange={handlelName} className="input" 
          value={lname} type="text" />
  
        <label className="label">Email</label>
        <input onChange={handleEmail} className="input" 
          value={email} type="email" />

        <label className="label">Phone </label>
        <input onChange={handlePhone} className="input" 
          value={phone} type="text" />

        <label className="label">Address </label>
        <input onChange={handleAddress} className="input" 
          value={address} type="text" />
          
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input" 
          value={password} type="password" />
  
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}