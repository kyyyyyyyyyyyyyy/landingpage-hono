export function getEnv(key: string, fallback?: string): string {
	const value = process.env[key] ?? fallback;
	if (!value) throw new Error(`Missing environment variable: ${key}`);
	return value;
}

export function isProduction(): boolean {
	return process.env.NODE_ENV === "production";
}
