import express, { Request } from "express"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import { signupRouter } from "./routes/signupRouter"
import { getUserRouter } from "./routes/getUser";
import { addToCartRouter } from "./routes/addToCartRouter";
import { getMyCartRouter } from "./routes/getMyCartRouter";
import { removeMyCartRouter } from "./routes/removeMyCartRouter";
import cookieParser from "cookie-parser"
import { quantityRouter } from "./routes/quantityRouter";
import { orderRouter } from "./routes/orderRouter";



const app = express()
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json())

app.use("/add",signupRouter);
app.use("/get",getUserRouter);
app.use("/add",addToCartRouter);
app.use("/get",getMyCartRouter);
app.use("/remove",removeMyCartRouter);
app.use("/quantity",quantityRouter);
app.use("/order",orderRouter);


app.listen(process.env.PORT || 8080,()=>console.log(`listning on PORT ${process.env.PORT}`))