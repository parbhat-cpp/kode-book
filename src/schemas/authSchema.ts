import { z } from "zod";

/**
 * - at least 8 characters
 * - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
 * - Can contain special characters
 */
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

/**
 * Usernames can contain characters a-z, 0-9, underscores and periods. 
 * The username cannot start with a period nor end with a period. 
 * It must also not have more than one period sequentially. Max length is 30 chars.
 */
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm

/**
 * Common password schema for login and signup.
 * Checks password length 8 >= or <= 18 with password regex.
 */
const passwordSchema: z.ZodString = z.string()
    .min(8, { message: "Password must be of atleast 8 " })
    .max(18, { message: "Max. password length is 18" })
    .regex(passwordRegex);

export const loginSchema = z.object({
    login_email: z.string().email(),
    login_password: passwordSchema,
});

export const signupSchema = z.object({
    fullname: z.string().min(3, { message: "Full name must contain 3 characters" }),
    username: z.string().min(3, { message: "Username must contain 3 characters" }).regex(usernameRegex),
    signup_email: z.string().email(),
    signup_password: passwordSchema,
});
