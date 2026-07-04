/**
 * Simple in-memory queue for async job processing.
 * Replace with Bull/BullMQ or Redis-backed queue for production.
 */

type JobHandler = (payload: unknown) => Promise<void>;

interface Job {
	name: string;
	handler: JobHandler;
	payload: unknown;
}

class Queue {
	private jobs: Job[] = [];
	private processing = false;

	add(name: string, handler: JobHandler, payload: unknown) {
		this.jobs.push({ name, handler, payload });
		this.process();
	}

	private async process() {
		if (this.processing) return;
		this.processing = true;

		while (this.jobs.length > 0) {
			const job = this.jobs.shift()!;
			try {
				await job.handler(job.payload);
			} catch (error) {
				console.error(`Job "${job.name}" failed:`, error);
			}
		}

		this.processing = false;
	}
}

export const queue = new Queue();
