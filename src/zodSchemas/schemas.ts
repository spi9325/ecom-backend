import z from "zod";

export const signupSchema = z.object({
    email: z.email({error:"email format is not valid..."}),
    password: z.string().min(6,{error:"password is minimum 6"}).max(10,{error:"password is maximum 10"}).optional(),
    image: z.string().optional()
})

export const addToCartSchema = z.object({
      name: z.string().min(5,{error:"Name is Minimum 5"}),
      email: z.email({error:"Provide Valid Email Format"}),
      price: z.number().min(2,{error:"Price Minimum 2"}),
      availabel: z.string()
})