import { ai } from "./client";
import type { PromptInput } from "@/types/gemini";
import { SYSTEM_PROMPT, AI_MODEL } from "@/lib/constants";

export const generateRecipe = async (userInput: PromptInput) => {
	const contents = JSON.stringify(userInput);

	try {
		const res = await ai.models.generateContent({
			model: AI_MODEL,
			contents,
			config: {
				systemInstruction: SYSTEM_PROMPT,
				responseMimeType: "application/json",
				thinkingConfig: {
					thinkingBudget: 0,
				},
			},
		});

		if (!res.text) {
			return {
				error: `Empty response from ${AI_MODEL}. Please try again!`,
			};
		}
		try {
			const recipe = JSON.parse(res.text);
			return recipe;
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				return { error: "Response from Gemini was not valid JSON" };
			}
			throw error;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			return {
				error: "An error has occured when attempting to generate recipe",
			};
		}
		console.error(error);
		return {
			error: "An unexpected error has occured",
		};
	}
};