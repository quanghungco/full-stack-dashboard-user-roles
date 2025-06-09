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

// Import the Genkit core libraries and plugins.
import { genkit, z } from 'genkit';
import GoogleGenerativeAI from '@genkit-ai/googleai';

// Cloud Functions for Firebase supports Genkit natively.
// The onCallGenkit function creates a callable function from a Genkit action.
// It automatically implements streaming if your flow does.
import { onCallGenkit } from 'firebase-functions/https';

// Genkit models generally depend on an API key.
// APIs should be stored in Cloud Secret Manager so that access to these
// sensitive values can be controlled. defineSecret does this automatically.
import { defineSecret } from 'firebase-functions/params';

// Define the API key secret
const apiKey = defineSecret('GOOGLE_GENAI_API_KEY');

// Initialize Genkit with Google AI plugin
const ai = genkit({
  plugins: [
    GoogleGenerativeAI(),
  ],
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string().describe('A restaurant theme').default('seafood'),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (subject, { sendChunk }) => {
    // Construct a request and send it to the model API.
    const prompt = `Suggest an item for the menu of a ${subject} themed restaurant`;
    const { response, stream } = ai.generateStream({
      model: 'gemini-pro',
      prompt: prompt,
      config: {
        temperature: 1,
      },
    });

    for await (const chunk of stream) {
      sendChunk(chunk.text);
    }

    // Handle the response from the model API.
    return (await response).text;
  }
);

// Define a flow for general text generation
const textGenerationFlow = ai.defineFlow(
  {
    name: 'textGenerationFlow',
    inputSchema: z.object({
      prompt: z.string(),
      context: z.string().optional(),
    }),
    outputSchema: z.string(),
  },
  async ({ prompt, context = '' }) => {
    const fullPrompt = context ? `${prompt}\nContext: ${context}` : prompt;
    const { response } = await ai.generate({
      model: 'gemini-pro',
      prompt: fullPrompt,
    });
    return response.text;
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