import React from "react";
import "./App.css";
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <div className="wrapper">
        <BrowserRouter>
        <Routes>
          <Route exact path="/login"
            element={<Login/>} />
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      </header>
    </div>
  );
}

export default App;