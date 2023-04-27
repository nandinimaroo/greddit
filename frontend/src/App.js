import './App.css';
import LogIn from "./LogIn";
import Register from "./Register";
import Profile from "./Profile";
import Mysub from "./Mysub";
import Sub from "./Sub";
import React, { useState,useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
var ReactDOM = require('react-dom');

function Followers()
{
  const navigate = useNavigate();

    useEffect(()=>{
      const loggedin = localStorage.getItem("LoggedIn");
      if(!loggedin)
      navigate("/");
    },[]);
    
  return (
    <div className='box'>
      Anu <button>Remove</button><br></br>
      Sriya <button>Remove</button><br></br>
      Mukta <button>Remove</button>
    </div>
  );
}
function Following()
{
  const navigate = useNavigate();

    useEffect(()=>{
      const loggedin = localStorage.getItem("LoggedIn");
      if(!loggedin)
      navigate("/");
    },[]);
    
  return (
    <div className='box'>
      Anu <button>Unfollow</button><br></br>
      Sriya <button>Unfollow</button><br></br>
      Mukta <button>Unfollow</button>
    </div>
  );
}


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={currentForm === "login" ? <LogIn onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }/>
      <Route path="/profile/followers" element={<Followers />}/>
      <Route path="/profile/following" element={<Following />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/mysubgreddits" element={<Mysub />} />
        <Route path="/subgreddits" element={<Sub />} />
      </Routes>
    </BrowserRouter>

  );

}


export default App;
