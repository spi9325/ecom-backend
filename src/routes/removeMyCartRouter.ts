import {Request, Response, Router} from "express"
import { prisma } from "../prismaClient/client";
import { user } from "../middleware/user";

export const removeMyCartRouter:Router = Router()

removeMyCartRouter.delete("/cart",user,async (req:Request,res:Response)=>{
    try {
        const {name} = req.body;
        await prisma.cart.delete({
            where:{
                email:req.email!,
                name
            },
        })
        res.status(200).send("cart removed...")       
    } catch (error) {
        console.log(error);
    }
})
removeMyCartRouter.delete("/all",user,async (req:Request,res:Response)=>{
    try {
        await prisma.cart.deleteMany({
            where:{
                email:req.email!,
            },
        })
        res.status(200).send("all removed...")       
    } catch (error) {
        console.log(error);
    }
})