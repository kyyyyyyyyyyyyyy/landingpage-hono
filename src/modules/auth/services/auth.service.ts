import { sign } from "hono/jwt";
import { config } from "../../../config";
import { BadRequestError, UnauthorizedError } from "../../../shared/errors";
import type { LoginDto } from "../dto/login.dto";
import type { RegisterDto } from "../dto/register.dto";
import type { AuthRepository } from "../repositories/auth.repository";
import type { JwtPayload, LoginResponse } from "../types/auth.types";

export class AuthService {
	constructor(private repo: AuthRepository) {}

	async login(dto: LoginDto): Promise<LoginResponse> {
		const user = await this.repo.findByEmail(dto.email);
		if (!user) throw new UnauthorizedError("Invalid credentials");

		const passwordMatch = dto.password === user.password;
		if (!passwordMatch) throw new UnauthorizedError("Invalid credentials");

		const payload: Record<string, unknown> = {
			id: user.id,
			email: user.email,
			role: user.role,
		};

		const token = await sign(payload, config.jwt.secret);

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		};
	}

	async register(dto: RegisterDto) {
		const existing = await this.repo.findByEmail(dto.email);
		if (existing) throw new BadRequestError("Email already registered");

		const user = await this.repo.create({
			name: dto.name,
			email: dto.email,
			password: dto.password,
		});

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	}
}
