import { Hono } from "hono";
import { authMiddleware } from "../../../middlewares";
import { AuthController } from "../controllers/auth.controller";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { validateLogin, validateRegister } from "../validators/auth.validator";

const router = new Hono();
const repo = new AuthRepository();
const service = new AuthService(repo);
const controller = new AuthController(service);

router.post("/login", validateLogin, (c) => controller.login(c));
router.post("/register", validateRegister, (c) => controller.register(c));
router.get("/me", authMiddleware, (c) => controller.me(c));

export default router;
