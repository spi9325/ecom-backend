import { NextFunction, Request, Response } from "express";
import { addToCartSchema, emailSchema, signupSchema } from "../zodSchemas/schemas";
import { prisma } from "../prismaClient/client";
import { decode } from "@auth/core/jwt";

export async function user(req: Request, res: Response, next: NextFunction) {
  const decoded = await decode({
    token: req.cookies['authjs.session-token'],
    salt: `${process.env.NODE_ENV === "development" ? 'authjs.session-token' : 'authjs.session-token'}`,
    secret: process.env.AUTH_SECRET!
  });
  if (decoded?.email === undefined) {
    res.send("unauthorized...")
  } else {
    const validInput = emailSchema.safeParse({email:decoded?.email});
    if (!validInput.success) {
      res.status(400).send("provide Valid Data")
      return;
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: validInput.data?.email!
      }
    })

    req.email = validInput.data.email
    next();
  }
}   