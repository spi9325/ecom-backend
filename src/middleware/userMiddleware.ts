import { NextFunction, Request, Response } from "express";
import { addToCartSchema, emailSchema, signupSchema } from "../zodSchemas/schemas";
import { prisma } from "../prismaClient/client";

export async function userMiddleware(req:Request,res:Response,next:NextFunction){
    const validInput = addToCartSchema.safeParse(req.body);
    if(!validInput.success){
        res.status(400).send("provide Valid Data")
        return;
    }
    const userExist = await prisma.user.findFirst({
        where:{
            email:validInput.data?.email!
        }
    })
   
        req.email = validInput.data.email
        next();
   }