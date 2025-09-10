import {Request, Response, Router} from "express"
import { prisma } from "../prismaClient/client";
import { user } from "../middleware/user";

export const getMyCartRouter:Router = Router()

getMyCartRouter.get("/cart",user,async function (req:Request,res:Response){
    try {        
        const myCart = await prisma.cart.findMany({
            where:{
                email:req.email!
            }
        })
        if(!myCart){
            res.status(404).send("cart not found...")
        }else{
            res.status(200).json({myCart});
        }
    } catch (error) {
        console.log(error);
    }
})