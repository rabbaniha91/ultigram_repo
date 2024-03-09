import * as z from "zod";

export const signUpValidateSchema = z.object({
  name: z.string().min(3, { message: "Too Short!" }),
  userName: z.string().min(2, { message: "Too short!" }),
  email: z.string().email({ message: "Please enter the valid email address" }),
  password: z.string(),
});
export const signInValidateSchema = z.object({
  email: z.string().email({ message: "Please enter the valid email address" }),
  password: z.string(),
});
