import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Navbar from './Nav';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function Mysub(props) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async(e) => {
    e.preventDefault();

    setOpen(true);
  };

  const handleClose = async(e) => {
    e.preventDefault();

    setOpen(false)
  };
  const handleCloseAndSave = async (e) => {
    e.preventDefault();


    try {
      const name = document.getElementById('name').value;
      const desc = document.getElementById('desc').value;
      const tags = document.getElementById('tags').value;
      const banned = document.getElementById('banned').value;

      const response = await axios.post("http://localhost:3002/api/subs/", {
        name, desc, tags, banned
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.log(err);
    }
    setOpen(false);

  };

  useEffect(() => {
    const getsubs = async () => {
      try {
        navigate("/mysubgreddits");
        const response = await axios.get(
          "http://localhost:3002/api/subs/",
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const subs = response.data;
        const ul = document.getElementById("data");
        ul.innerHTML = ""; // clear the content of the div before adding new elements
        subs.forEach((sub) => {
          const subGredditDiv = document.createElement("div");
          subGredditDiv.classList.add("sub-greddit");
  
          const nameHeading = document.createElement("h2");
          nameHeading.textContent = sub.name;
  
          const descriptionParagraph = document.createElement("p");
          descriptionParagraph.textContent = "Description:"+sub.desc;
  
          const tags = document.createElement("p");
          tags.textContent = "No. of people: 1," +"\n"+"No. of posts: 0 ";
  
          const bannedKeywordsParagraph = document.createElement("p");
          bannedKeywordsParagraph.textContent = `Banned Keywords: ${sub.banned}`;
          const mod = document.createElement("p");
          mod.textContent = "Moderator: " + sub.moderator;
          subGredditDiv.appendChild(nameHeading);
          subGredditDiv.appendChild(descriptionParagraph);
          subGredditDiv.appendChild(tags);
          subGredditDiv.appendChild(bannedKeywordsParagraph);
          subGredditDiv.appendChild(mod);
  
          ul.appendChild(subGredditDiv);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getsubs();
  }, []); 
  

  return (
    <div className='login'>
      <Navbar></Navbar>

      <form className='box'>


        <h1>My Sub Greddits</h1>

<button onClick={handleClickOpen} ><PostAddIcon >Create
        </PostAddIcon></button>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Name" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="desc" label="Description" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="tags" label="Tags" type="text" variant="standard" />
            <br></br>
            <TextField autoFocus margin="dense" id="banned" label="Banned keywords" type="text" variant="standard" />
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAndSave}>Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <div id="data" >

        </div>
      </form>

    </div>);
}