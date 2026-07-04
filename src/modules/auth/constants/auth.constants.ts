export const AUTH_ERRORS = {
	INVALID_CREDENTIALS: "Invalid email or password",
	EMAIL_EXISTS: "Email already registered",
	TOKEN_EXPIRED: "Token expired",
} as const;

export const ROLES = {
	ADMIN: "admin",
	SUPER_ADMIN: "super_admin",
} as const;
