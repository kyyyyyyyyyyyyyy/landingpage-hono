import "dotenv/config";

export const config = {
	app: {
		port: Number(env("PORT", "3000")),
		env: env("NODE_ENV", "development"),
		name: env("APP_NAME", "Go Landing Page"),
	},
	database: {
		url: env("DATABASE_URL"),
	},
	jwt: {
		secret: env("JWT_SECRET"),
		expiresIn: env("JWT_EXPIRES_IN", "1d"),
	},
	midtrans: {
		serverKey: env("MIDTRANS_SERVER_KEY"),
		clientKey: env("MIDTRANS_CLIENT_KEY"),
		isProduction: env("MIDTRANS_IS_PRODUCTION", "false") === "true",
	},
	biteship: {
		apiKey: env("BITESHIP_API_KEY"),
		baseUrl: env("BITESHIP_BASE_URL", "https://api.biteship.com/v1"),
	},
} as const;

function env(key: string, fallback?: string): string {
	const value = process.env[key] ?? fallback;
	if (!value) throw new Error(`Missing environment variable: ${key}`);
	return value;
}