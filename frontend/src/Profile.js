import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Nav';

export default function Profile(props) {


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token)
      navigate("/");
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndSave = async () => {
    const newFirstName = document.getElementById('newfname').value;
    const newLastName = document.getElementById('newlname').value;
    const newUsername = document.getElementById('newusername').value;
    const newEmail = document.getElementById('newemail').value;
    const newAge = document.getElementById('newage').value;
    const newContact = document.getElementById('newcontact').value;
    try {
      const response = await axios.put(
        "http://localhost:3002/api/users/",
        { newFirstName, newLastName, newUsername, newEmail, newAge, newContact },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log("back in frontend");
      // console.log(response.data);

      document.getElementById("fname").textContent = response.data.fname;
      document.getElementById("lname").textContent = response.data.lname;
      document.getElementById("username").textContent = response.data.username;
      document.getElementById("email").textContent = response.data.email;
      document.getElementById("age").textContent = response.data.age;
      document.getElementById("contact").textContent = response.data.contact;
      document.getElementById("password").textContent = response.data.password;

    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  const getdeets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/users/",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log("back in frontend");
      // console.log(response.data);

      document.getElementById("fname").textContent = response.data.fname;
      document.getElementById("lname").textContent = response.data.lname;
      document.getElementById("username").textContent = response.data.username;
      document.getElementById("email").textContent = response.data.email;
      document.getElementById("age").textContent = response.data.age;
      document.getElementById("contact").textContent = response.data.contact;
      document.getElementById("password").textContent = response.data.password;

    } catch (err) {
      console.log(err);
    }
  };
  getdeets();
  return (
    <div className='login'>
      <Navbar></Navbar>

      <form className='box'>
        {/* 
        
        Name:
        <div id="fname">Nandini</div>
        <div id="lname">Nandini</div>
        Username: nyandini_ 
        Email: nandini.maroo@gmail.com 
        Age: 19
        Contact Number: 1231231234 */}

        <h1>Profile</h1>

        <table style={{ textAlign: "left" }}>
          Name:
          <span id="fname" class="datainprof" ></span>&#160;<span id="lname" class="datainprof"></span>

          <br></br>
          <br></br>


          Username:
          <span id="username" class="datainprof"></span>
          <br></br>
          <br></br>


          Email:
          <span id="email" class="datainprof"></span>
          <br></br>
          <br></br>
          Age:
          <span id="age" class="datainprof"></span>
          <br></br>
          <br></br>
          Contact:
          <span id="contact" class="datainprof"></span>
          <br></br>
          <br></br>
          {/* Password:
        <span id="password"></span>
        <br></br> */}
        </table>
        <EditIcon onClick={handleClickOpen} >Edit
        </EditIcon>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="newfname" label="First name" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="newlname" label="Last Name" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="newusername" label="Username" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="newemail" label="Email" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="newage" label="Age" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="newcontact" label="Contact" type="text" variant="standard" />
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAndSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <br></br>
        <button className="button-53" onClick={() => navigate("/profile/followers")}>Followers: 3</button><br></br>
        <button className="button-53" onClick={() => navigate("/profile/following")}>Following: 3</button><br></br>
        {/* <button className="button-52">Edit</button> */}

        <button className="button-52" onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }} >LogOut</button>
      </form>

    </div>);
}

