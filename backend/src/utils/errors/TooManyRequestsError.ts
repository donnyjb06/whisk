export default class TooManyRequestsError extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 429;
	}
}
