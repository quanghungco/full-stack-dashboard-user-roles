/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";

// Import the Genkit core libraries and plugins
import {genkit, z} from "genkit";
import GoogleGenerativeAI from '@genkit-ai/googleai';
import {HarmCategory} from '@genkit-ai/googleai';

// Cloud Functions for Firebase supports Genkit natively
import {onCallGenkit} from "firebase-functions/https";
import {defineSecret} from "firebase-functions/params";

// Define the API key secret
const apiKey = defineSecret("GOOGLE_GENAI_API_KEY");

// Initialize Genkit with Google AI plugin
const ai = genkit({
  plugins: [
    GoogleGenerativeAI(),
  ],
});

// Define safety settings for content generation
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  }
];

// Menu suggestion flow
const menuSuggestionFlow = ai.defineFlow({
  name: "menuSuggestionFlow",
  inputSchema: z.string().describe("A restaurant theme").default("seafood"),
  outputSchema: z.string(),
  streamSchema: z.string(),
}, async (subject, {sendChunk}) => {
  const prompt = `Suggest an item for the menu of a ${subject} themed restaurant`;
  const {response, stream} = ai.generateStream({
    model: 'gemini-pro',
    prompt: prompt,
    config: {
      temperature: 1,
      safetySettings: SAFETY_SETTINGS
    },
  });

  for await (const chunk of stream) {
    sendChunk(chunk.text);
  }

  return (await response).text;
});

// General text generation flow
const textGenerationFlow = ai.defineFlow({
  name: "textGenerationFlow",
  inputSchema: z.object({
    prompt: z.string(),
    context: z.string().optional(),
  }),
  outputSchema: z.string(),
}, async ({prompt, context = ''}) => {
  const fullPrompt = context ? `${prompt}\nContext: ${context}` : prompt;
  const {response} = await ai.generate({
    model: 'gemini-pro',
    prompt: fullPrompt,
    config: {
      safetySettings: SAFETY_SETTINGS
    },
  });
  return response.text;
});

// Export callable functions
export const menuSuggestion = onCallGenkit({
  secrets: [apiKey],
}, menuSuggestionFlow);

export const generateResponse = onCallGenkit({
  secrets: [apiKey],
}, textGenerationFlow);

// Basic API endpoint for health checks
export const api = onRequest((req, res) => {
  logger.info("Request received:", req.path);
  res.json({status: "ok"});
});