import { NextFunction, Request, Response } from "express";
import { signupSchema } from "../zodSchemas/schemas";
import { prisma } from "../prismaClient/client";

export async function userMiddleware(req:Request,res:Response,next:NextFunction){
    if(!req.body.email){
        res.status(404).json({error:"provide email"})
        return
    } 
    const validInput = signupSchema.safeParse(req.body);
    const user = await prisma.user.findUnique({
        where:{
            email:validInput.data?.email!
        }
    });
    if(user?.email){
        req.email = user.email
    }

    next();
}