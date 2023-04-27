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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Sub(props) {
 

  const getsubs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/subs/all",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      // document.getElementById("data").textContent = response.data[0].name;
      const subs = response.data;
      const ul = document.getElementById("data");
      subs.forEach((sub) => {
        const subGredditDiv = document.createElement("div");
        subGredditDiv.classList.add("sub-greddit");

        const nameHeading = document.createElement("h2");
        nameHeading.textContent = sub.name;

        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = "Description:"+sub.desc;

        const tags = document.createElement("p");
        tags.textContent = "No. of people: 1" +"\n"+"No. of posts: 0 ";

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
       console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
getsubs();
  return (
    <div className='login'>
      <Navbar></Navbar>

      <form className='box'>


        <h1>Sub Greddits</h1>

        
        <div id="data" >

        </div>
      </form>

    </div>);
}