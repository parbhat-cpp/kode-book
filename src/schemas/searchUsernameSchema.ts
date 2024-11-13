import { z } from "zod";
import { usernameRegex } from "./authSchema";

export const searchUsernameSchema = z.object({
    username: z.string().min(3, { message: "Invalid Username" }).regex(usernameRegex),
})
