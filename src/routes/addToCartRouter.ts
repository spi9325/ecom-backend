import { Request, Response, Router } from "express"
import { addToCartSchema } from "../zodSchemas/schemas"
import { userMiddleware } from "../middleware/userMiddleware";
import { prisma } from "../prismaClient/client";

export const addToCartRouter: Router = Router()

addToCartRouter.post("/cart", userMiddleware, async (req: Request, res: Response) => {
    try {
        const validInput = addToCartSchema.safeParse(req.body);
        if (!validInput.success) {
            res.status(400).send("Provide Vaild Inputs");
            return;
        }
        const { name, price, availabel } = validInput.data;
        const Cart_Alredy_Exist = await prisma.cart.findFirst({
            where: {
                name,
                email: req.email!
            }
        })
    
        if (!Cart_Alredy_Exist) {
            const cart = await prisma.cart.create({
                data: {
                    name,
                    email: req.email!,
                    price: price.toString(),
                    availabel
                }
            })
            if (cart) {
                res.status(200).send("cart add");
            }
        }
    } catch (error) {
        console.log(error);
    }

})