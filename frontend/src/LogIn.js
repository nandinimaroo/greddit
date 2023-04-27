
import Profile from "./Profile";
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


export default function LogIn(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      navigate("/profile");
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(username, password);

    try {
      const response = await axios.post("http://localhost:3002/api/auth/", {
        username, password, 
      });
      console.log(response.data);
      if (response.data) {
        navigate("/profile");
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      console.log(err);
    }

  
  };

  return (

    <div className='login'>
      <form className='box'>
        <h1>LogIn</h1>

        <label for="uname">Username:</label><br></br>
        <input type="text" id="uname" name="uname" value={username}
          onChange={(e) => setUsername(e.target.value)}></input>
        <br></br>
        <br></br>

        <label for="pw">Password:</label><br></br>
        <input type="password" id="pw" name="pw" value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <br></br>
        <button className='button-52' onClick={handleSubmit} disabled={!username || !password}>LogIn</button>
        <br></br>
        <br></br>
        <button onClick={() => props.onFormSwitch('register')} className='button-52'> I want to register!</button>
      </form>

    </div>);
}

