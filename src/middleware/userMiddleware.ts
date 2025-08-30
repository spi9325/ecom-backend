import { NextFunction, Request, Response } from "express";
import { signupSchema } from "../zodSchemas/schemas";
import { prisma } from "../prismaClient/client";

async function userMiddleware(req:Request,res:Response,next:NextFunction){
    const validInput = signupSchema.safeParse(req.body);
    if(!validInput.success){
        res.status(400).send("provide Valid Data")
        return;
    }
    const userExist = await prisma.user.findFirst({
        where:{
            email:validInput.data?.email!
        }
    })
    if(userExist){
        req.email = validInput.data.email
        next();
    }
}