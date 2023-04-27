import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js"
import subRouter from "./routes/sub.js"
import authRouter from "./routes/auth.js"
import connectDB from "./utilities/connectDB.js";

const app = express();
app.use(cors());

connectDB();
app.use(express.json());


app.use('/api/users', userRouter);
app.use('/api/subs', subRouter);
app.use('/api/auth', authRouter);

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`serrver lol`)
});

// mongodb+srv://admin:<password>@cluster0.pr5lntu.mongodb.net/?retryWrites=true&w=majority