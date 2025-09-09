import { Request, Response, Router } from "express"
import { addToCartSchema } from "../zodSchemas/schemas"
import { userMiddleware } from "../middleware/userMiddleware";
import { prisma } from "../prismaClient/client";

export const addToCartRouter: Router = Router()

addToCartRouter.post("/cart",userMiddleware,async (req: Request, res: Response) => {
    try {
        const validInput = addToCartSchema.safeParse(req.body);
        if (!validInput.success) {
            res.status(400).send("Provide Vaild data");
            return;
        }
        const { name, price, image, total, qty } = validInput.data;
        
        const Cart_Alredy_Exist = await prisma.cart.findUnique({
            where: {
                name,
                email: req.email!
            }
        })

        if (Cart_Alredy_Exist === null) {
            const cart = await prisma.cart.create({
                data: {
                    name,
                    email: req.email!,
                    price,
                    image,
                    total,
                    qty
                }
            })
            if (cart) {
                res.status(200).send("cart add...");
            }
        }else{
               res.status(200).send("cart already exist...");
        }
    } catch (error) {
        console.log(error);
    }

})