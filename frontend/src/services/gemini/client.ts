import { GEMINI_API_KEY } from "@/lib/constants";
import {GoogleGenAI} from "@google/genai";

// TODO: REMOVE API KEY FROM CLIENT SIDE AND ONLY GENERATE RECIPES ON THE SERVER ASAP!!
export const ai = new GoogleGenAI({apiKey: "AIzaSyDfL_w_9KOr81ACKL6-Nl8fU7xopok59eE"})