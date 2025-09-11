import { decode } from "@auth/core/jwt";
import { Request, Response, Router } from "express";
import { user } from "../middleware/user";
import { prisma } from "../prismaClient/client";

export const orderRouter: Router = Router()

orderRouter.put("/place", user, async (req, res) => {
    try {
        const { carts } = req.body

        const savedOrders = await Promise.all(
            carts.map(async (item: any) => {
                return await prisma.order.create({
                    data: {
                        email: req.email!,
                        name: item.name,
                        price: (item.price).toString(),
                        total: (item.total).toString(),
                        qty: (item.qty).toString(),
                    },
                });
            })
        );
        res.status(200).send("add order")
    } catch (error) {
        console.log(error)
    }
})
orderRouter.post("/my", async (req: Request, res: Response) => {
    try {
        const decoded = await decode({
            token: req.cookies['authjs.session-token'],
            salt: `${process.env.NODE_ENV === "development" ? 'authjs.session-token' : 'authjs.session-token'}`,
            secret: process.env.AUTH_SECRET!
        });
        const orders = await prisma.user.findFirst({
            where: {
                email: decoded?.email!,
            },
            include: {
                orders: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        })
        res.send(orders)
    } catch (error) {
        console.log(error);
    }
})