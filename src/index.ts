import express from "express"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import { signupRouter } from "./routes/signupRouter"
import { getUserRouter } from "./routes/getUser";

const app = express()
app.use(cors({origin:["http://localhost:3000",`${process.env.PORT}`]}))
app.use(express.json())

app.use("/add",signupRouter);
app.use("/get",getUserRouter);


app.listen(process.env.PORT || 8080,()=>console.log(`listning on PORT ${process.env.PORT}`))