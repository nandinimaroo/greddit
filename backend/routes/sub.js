import express from "express";
import Sub from "../models/Sub.js"
import auth from "../middleware/auth.js"
import User from "../models/User.js"

const router = express.Router();


router.post("/",auth,async(req,res)=>{
    try {
        const id = req.user.id;
        const user = await User.findOne({ _id: id });   
        const { name, desc,tags,banned } = req.body;
        const moderator=user.username;
        const sub = new Sub({ name, desc,tags,banned,moderator  })
        // console.log(sub);
       
        await sub.save();
        res.send(sub);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
router.get("/",auth, async (req, res) => {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });   
    try {
        const subs = await Sub.find({moderator: user.username});
        console.log(subs);
        res.send(subs);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
router.get("/all",auth, async (req, res) => {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });   
    try {
        const subs = await Sub.find();
        console.log(subs);
        res.send(subs);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
export default router;