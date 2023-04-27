import express from "express";
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import auth from "../middleware/auth.js"
const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.send(users);
//     }
//     catch (err) {
//         console.error('Error:', err);
//         res.status(500).send({ errors: [{ msg: "Server Error" }] });
//     }
// });
router.get("/",auth, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({ _id: id });
        console.log(user);
        res.send(user);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
router.put("/", auth, async (req, res) => {
    try {
        const {newFirstName, newLastName, newUsername, newEmail, newAge, newContact }=req.body;
        // console.log(newAge);
        const id = req.user.id;
        // const { fname } = req.body;
        const user = await User.findOne({ _id: id });
        if(newFirstName!="")
          user.fname = newFirstName;
      if (newLastName != "")
          user.lname = newLastName;
      if (newUsername != "")
          user.username = newUsername;
      if (newEmail != "")
          user.email = newEmail;
      if (newAge != "")
          user.age = newAge;
      if (newContact != "")
          user.contact = newContact;
        await user.save();
        res.send(user);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
router.post("/", async (req, res) => {
    try {
        const { fname, lname, username, email, age, contact, password } = req.body;
        let user = await User.findOne({ username });
        if (user)
            return res.status(400).send({ errors: [{ msg: "Username already exists" }] })
        user = new User({ fname, lname, username, email, age, contact, password })
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }

});
router.get("/:id/post/:postId", (req, res) => {
    console.log(req.params);
    const { postId } = req.params;
    if (postId > 0) res.send("valid");
    console.log("invalid post id");
    res.status(400).send("invalid post id");
    res.send("this is the /users route");
});

export default router;