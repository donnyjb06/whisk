import TooManyRequestsError from "../utils/errors/TooManyRequestsError";
import type { NextFunction, Request, Response } from "express";
import rateLimit, { type RateLimitRequestHandler } from "express-rate-limit";

export const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	legacyHeaders: false,
	standardHeaders: true,
	handler: (req: Request, res: Response, next: NextFunction) => {
		return next(
			new TooManyRequestsError(
				"Rate limit exceeded. Please wait at least 15 minutes."
			)
		);
	},
});

export const recipeGenerationLimiter: RateLimitRequestHandler = rateLimit({
	windowMs: 60 * 1000,
	limit: 2,
	legacyHeaders: false,
	standardHeaders: true,
	handler: (req: Request, res: Response, next: NextFunction) => {
		return next(
			new TooManyRequestsError(
				"Recipe generation limit exceeded. Please wait a minute."
			)
		);
	},
});
