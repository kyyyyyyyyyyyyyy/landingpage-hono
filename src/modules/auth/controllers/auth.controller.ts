import type { Context } from "hono";
import { created, ok } from "../../../shared/helpers/response";
import type { LoginDto } from "../dto/login.dto";
import type { RegisterDto } from "../dto/register.dto";
import type { AuthService } from "../services/auth.service";

export class AuthController {
	constructor(private service: AuthService) {}

	async login(c: Context) {
		const dto = (c.req.valid as any)("json") as LoginDto;
		const result = await this.service.login(dto);
		return ok(c, result);
	}

	async register(c: Context) {
		const dto = (c.req.valid as any)("json") as RegisterDto;
		const result = await this.service.register(dto);
		return created(c, result);
	}

	async me(c: Context) {
		const user = c.get("user");
		return ok(c, user);
	}
}
