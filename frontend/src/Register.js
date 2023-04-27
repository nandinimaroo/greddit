import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";



export default function Register(props) {
  const navigate = useNavigate();

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setPassword] = useState("");
   
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:3002/api/users/", {
        fname, lname, username, email, age, contact, password });
        props.onFormSwitch('login')
    } catch (err) {
      console.log(err);
    }

  };


  return (
    <div className='login'>

      <form className='box'>
        <h1>Register</h1>
        <label for="fname">First Name:</label><br></br>
        <input type="text" id="fname" name="fname" value={fname}
          onChange={(e) => setfname(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="pw">Last Name:</label><br></br>
        <input type="text" id="lname" name="pw" value={lname}
          onChange={(e) => setlname(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="uname">Username:</label><br></br>
        <input type="text" id="uname" name="uname" value={username}
          onChange={(e) => setUsername(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="pw" >Email:</label>
        <br></br>
        <input type="text" id="email" name="pw" value={email}
          onChange={(e) => setemail(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="uname">Age:</label>
        <br></br>
        <input type="text" id="age" name="uname" value={age}
          onChange={(e) => setage(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="pw">Contact Number:</label><br></br>
        <input type="text" id="contact" name="pw" value={contact}
          onChange={(e) => setcontact(e.target.value)}></input>
        <br></br>
        <br></br>
        <label for="pw">Password:</label><br></br>
        <input type="password" id="password" name="pw" value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <br></br>
        <button className='button-52'  onClick={handleSubmit}disabled={!username || !password||!fname||!lname||!age||!contact||!email}>Register</button>
        <br></br>
        <br></br>
        <button onClick={() => props.onFormSwitch('login')} className='button-52'> I already have an account :)</button>
      </form>

    </div>);
}
