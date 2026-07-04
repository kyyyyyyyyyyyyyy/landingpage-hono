export function now(): string {
	return new Date().toISOString();
}

export function formatDate(date: Date): string {
	return date.toISOString().split("T")[0];
}
