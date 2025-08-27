import express from "express"
import { signupRouter } from "./routes/signupRouter"

const app = express()
app.use(express.json())

app.use("/add",signupRouter);


app.listen(process.env.PORT || 8080,()=>console.log(`listning on PORT ${process.env.PORT}`))