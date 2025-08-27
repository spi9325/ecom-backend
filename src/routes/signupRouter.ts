import { Router } from "express";
import type { Request, Response } from "express"
import { signupSchema } from "../zodSchemas/schemas.js";
export const signupRouter: Router = Router();

signupRouter.post("/user",async (req:Request,res:Response)=>{
    try {
        const validInput = signupSchema.safeParse(req.body);
        console.log(validInput.data)
    } catch (error) {
        console.log(error);
    }
})