import { createHash } from "node:crypto";

export function sha512(data: string, key: string): string {
	return createHash("sha512")
		.update(data + key)
		.digest("hex");
}

export function base64Encode(data: string): string {
	return Buffer.from(data).toString("base64");
}
