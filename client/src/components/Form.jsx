import React,{useState} from "react";

function Form()
{
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/register")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
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
  const handleSubmit = (event) => {
    console.log("Submit is clicked")
    event.preventDefault();
    if (fname === '' || email === '' || password === '') {
      setError(true);
    }else{
    const url = "/api/register";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname,lname,email,address,phone,password })
    };
    fetch(url, requestOptions)
        .then(response=>response.json())
        .then((json)=>console.log(json))
        .catch(error => console.log('Form submit error', error))
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
    <div>
      <div>
        <h1>User Registration</h1>
      </div>
  
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
  
      <form className="form"  method="POST" onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label" for="fname">First Name</label><br/>
        <input onChange={handlefName} className="input" 
          value={fname} type="text" id="fname"/>
        <br/>
        <label className="label" for="lname">Last Name</label ><br/>
        <input onChange={handlelName} className="input" 
          value={lname} type="text" id="lname"/>
        <br/>
        <label className="label" for="email">Email</label><br/>
        <input onChange={handleEmail} className="input" 
          value={email} type="text" id="email"/>
        <br/>
        <label className="label" for="phone">Phone </label><br/>
        <input onChange={handlePhone} className="input" 
          value={phone} type="number" id="phone" />
        <br/>
        <label className="label" for="address">Address </label><br/>
        <input onChange={handleAddress} className="input" 
          value={address} type="text" id="address"/>
        <br/>
        <label className="label" for="password">Password</label><br/>
        <input onChange={handlePassword} className="input" 
          value={password} type="password" id="password" />
        <br/>
        <button type="submit" className="btn">
          Submit
        </button><br/>
      </form>
    </div>
  );
}
export default Form;