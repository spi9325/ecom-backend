import {Request, Response, Router} from "express"
import { prisma } from "../prismaClient/client";
import { user } from "../middleware/user";

export const quantityRouter:Router = Router();

quantityRouter.put("/increase",user,async(req:Request,res:Response)=>{
    try {
    const { name} = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name and qty required" });
    }

    // Find the cart item by name
    const cartItem = await prisma.cart.findFirst({
      where: { name,email:req.email! }
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Update qty and total
    const updatedCart = await prisma.cart.update({
      where: { name }, // update by unique ID
      data: {
        qty: (Number(cartItem.qty) + 1).toString(),
        total: (Number(cartItem.price) * (Number(cartItem.qty) + 1)).toString()
      }
    });

    res.json({ message: "Quantity updated", cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

quantityRouter.put("/decrease",user,async(req:Request,res:Response)=>{
    try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name and qty required" });
    }

    // Find the cart item by name
    const cartItem = await prisma.cart.findFirst({
      where: { name, email:req.email! }
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Update qty and total
    const updatedCart = await prisma.cart.update({
      where: { name }, // update by unique ID
      data: {
        qty: (Number(cartItem.qty) - 1).toString(),
        total: (Number(cartItem.price) * (Number(cartItem.qty) - 1)).toString()
      }
    });

    res.json({ message: "Quantity updated", cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})