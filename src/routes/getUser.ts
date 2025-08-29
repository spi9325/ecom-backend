import {Router} from "express"
import type { Request, Response } from "express"
import { prisma } from "../prismaClient/client";
import { signupSchema } from "../zodSchemas/schemas";
export const getUserRouter: Router = Router();

getUserRouter.post("/user", async (req: Request, res: Response) => {
  try {
    const {  email  } = req.body;
    if(!email){
        res.status(400).json({error:"please provide email.."})
    }
    const validInput = signupSchema.safeParse(req.body);
    const user = await prisma.user.findUnique({
        where:{
            email:validInput.data?.email!
        }
    })
    if(user){
        res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});
