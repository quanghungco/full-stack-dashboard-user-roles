/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at
 * https://firebase.google.com/docs/functions
 */

// Core Firebase Functions imports
import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import {onCallGenkit} from "firebase-functions/https";
import {defineSecret} from "firebase-functions/params";

// Genkit imports
import {genkit, z} from "genkit";
import googleGenerativeAI from "@genkit-ai/googleai";

// Define the API key secret
const apiKey = defineSecret("GOOGLE_GENAI_API_KEY");

// Initialize Genkit with Google AI plugin
const ai = genkit({
  plugins: [
    googleGenerativeAI(),
  ],
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
const menuSuggestionFlow = ai.defineFlow(
  {
    name: "menuSuggestionFlow",
    inputSchema: z.string().describe("A restaurant theme").default("seafood"),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (subject, {sendChunk}) => {
    const prompt = "Suggest an item for the menu of a " +
      `${subject} themed restaurant`;
    const {stream} = await ai.generateStream({
      model: "gemini-pro",
      prompt: prompt,
      config: {
        temperature: 1,
      },
    });

    let fullText = "";
    for await (const chunk of stream) {
      const text = chunk.text;
      sendChunk(text);
      fullText += text;
    }

    return fullText;
  }
);

// Define a flow for general text generation
const textGenerationFlow = ai.defineFlow(
  {
    name: "textGenerationFlow",
    inputSchema: z.object({
      prompt: z.string(),
      context: z.string().optional(),
    }),
    outputSchema: z.string(),
  },
  async ({prompt, context = ""}) => {
    const fullPrompt = context ? `${prompt}\nContext: ${context}` : prompt;
    const result = await ai.generate({
      model: "gemini-pro",
      prompt: fullPrompt,
    });
    return result.text;
  }
);

// Export the callable functions
export const menuSuggestion = onCallGenkit(
  {
    secrets: [apiKey],
  },
  menuSuggestionFlow
);

export const generateResponse = onCallGenkit(
  {
    secrets: [apiKey],
  },
  textGenerationFlow
);

// Basic API endpoint for health checks
export const api = onRequest((req, res) => {
  logger.info("Request received:", req.path);
  res.json({status: "ok"});
});
