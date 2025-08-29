import { Router } from "express";
import type { Request, Response } from "express"
import { signupSchema } from "../zodSchemas/schemas.js";
import { prisma } from "../prismaClient/client.js";
import bcrypt from "bcrypt";
export const signupRouter: Router = Router();

signupRouter.post("/user",async (req:Request,res:Response)=>{
    try {
        if(!req.body.email || !req.body.password) return
        const validInput =signupSchema.safeParse(req.body);
        
        if(!validInput.success){
          res.status(400).send(validInput.error);
          return
        }
        const userExist = await prisma.user.findUnique({
            where:{
                email:validInput.data?.email!
            }
        });

        if(userExist){
            res.status(400).json({message:"user alredy exist..."})
            return
        }
        const hashPassword = await bcrypt.hash(validInput.data?.password!,10);

        await prisma.user.create({
            data:{
                email:validInput.data?.email!,
                password:hashPassword
            }
        })
        res.status(200).json({messgae:"user added.."})
    } catch (error) {
        console.log(error);
    }
})

signupRouter.post("/googleuser", async (req: Request, res: Response) => {
  try {
    const {  email, image } = req.body;
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (!userExist?.password) {
      const result = await prisma.user.upsert({
        where: { email },
        update: {
          image,
        },
        create: {
          email,
          image,
        },
      });
      if (result) {
        res.status(200).json({result});
      } else {
        res.status(500).send("error from backend res..... EEEEEE");
      }
    }else{
      res.status(500).send("worng user from backend res..... EEEEEE");
    }
  } catch (error) {
    console.log(error);
  }
});



