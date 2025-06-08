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
import { HarmCategory, HarmBlockThreshold } from '@genkit-ai/googleai';

// Cloud Functions for Firebase supports Genkit natively.
// The onCallGenkit function creates a callable function from a Genkit action.
// It automatically implements streaming if your flow does.
import { onCallGenkit } from 'firebase-functions/https';

// Genkit models generally depend on an API key.
// APIs should be stored in Cloud Secret Manager so that access to these
// sensitive values can be controlled. defineSecret does this automatically.
import { defineSecret } from 'firebase-functions/params';

// The Firebase telemetry plugin exports a combination of metrics, traces,
// and logs to Google Cloud Observability.
const apiKey = defineSecret('GOOGLE_GENAI_API_KEY');

const ai = genkit({
  plugins: [
    // Load the Google AI plugin.
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

// Export the callable function
export const menuSuggestion = onCallGenkit(
  {
    // Grant access to the API key to this function:
    secrets: [apiKey],
  },
  menuSuggestionFlow
);

// Generate Response Function
export const generateResponse = async (
  prompt: string,
  context: string,
): Promise<string> => {
  try {
    const response = await ai.generate({
      model: 'gemini-pro',
      prompt: prompt + context,
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // Add threshold
          },
        ],
      },
    });
    const responseText = response.text;
    return responseText;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

// Example usage to fix unused variables warning
export const api = onRequest((req, res) => {
  logger.info("Request received:", req.path);
  res.json({status: "ok"});
});
