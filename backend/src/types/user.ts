import z from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(3).max(255),
});

export const SigniInSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(3).max(255),
});