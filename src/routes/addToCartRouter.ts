import {Request, Response, Router} from "express"
import { addToCartSchema } from "../zodSchemas/schemas"
import { userMiddleware } from "../middleware/userMiddleware";
import { prisma } from "../prismaClient/client";

export const addToCartRouter: Router = Router()

addToCartRouter.post("cart",userMiddleware,async (req:Request,res:Response)=>{
    const validInput = addToCartSchema.safeParse(req.body);
    if(!validInput.success){
        res.status(400).send("Provide Vaild Inputs");
        return;
    }
    const {name,price,availabel} = validInput.data;
    const cart = await prisma.cart.create({
        data:{
            name,
            email:req.email!,
            price:price.toString(),
            availabel
        }
    })
    if(cart){
        res.status(200).send("cart add");
    }
})