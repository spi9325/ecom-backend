import z from "zod";

export const signupSchema = z.object({
    email: z.email({error:"email format is not valid..."}),
    password: z.string().min(6,{error:"password is minimum 6"}).max(10,{error:"password is maximum 10"}).optional(),
    image: z.string().optional()
})