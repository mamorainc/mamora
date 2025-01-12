import { z } from "zod";

export const signUpformSchema = z
    .object({
        username: z
            .string()
            .min(1, { message: "Please enter your username" })
            .max(15, { message: "Username must be 15 characters or less" }),
        email: z
            .string()
            .min(1, { message: "Please enter your email" })
            .email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(1, {
                message: "Please enter your password",
            })
            .min(7, {
                message: "Password must be at least 7 characters long",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    });

export type SignUpFormData = z.infer<typeof signUpformSchema>;
