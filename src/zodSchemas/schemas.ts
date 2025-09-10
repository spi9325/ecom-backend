import z from "zod";

export const signupSchema = z.object({
    email: z.email({error:"email format is not valid..."}),
    password: z.string().min(6,{error:"password is minimum 6"}).max(10,{error:"password is maximum 10"}).optional(),
    image: z.string().optional()
})
export const emailSchema = z.object({
    email: z.email({error:"email format is not valid..."}),
})

export const addToCartSchema = z.object({
      name: z.string(),
      email: z.email({error:"Provide Valid Email Format"}),
      price: z.string(),
      image:z.string(),
      total:z.string(),
      qty:z.string()
})