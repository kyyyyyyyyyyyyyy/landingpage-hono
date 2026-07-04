import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../dto/login.dto";
import { registerSchema } from "../dto/register.dto";

export const validateLogin = zValidator("json", loginSchema);
export const validateRegister = zValidator("json", registerSchema);
