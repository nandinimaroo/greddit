import express from "express";
import User from "../models/User.js"

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username, password);
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).send({ errors: [{ msg: "No user found" }] })

        const match = await user.checkPassword(password);
        // console.log(username, password);

        if (match) {

            const token = user.generateToken();
            return res.send({ token });
        }
        return res.status(400).send({ errors: [{ msg: "Invalid password" }] });

    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});
export default router;