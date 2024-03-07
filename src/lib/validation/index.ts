import * as z from "zod"

export const signUpValidateSchema = z.object({
    firstName: z.string().min(3, {message: "Too short!"}),
    lastName: z.string().min(3, {message: "Too short!"}),
    userName: z.string().min(2, {message: "Too short!"}),
    email: z.string().email({message: "Please enter the valid email address"}),
    password: z.string()
  });