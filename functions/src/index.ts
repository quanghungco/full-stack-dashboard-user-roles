import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Response } from "express";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

// Initialize Firebase only once
admin.initializeApp();

// Typed prediction client
let predictionClient: PredictionServiceClient | null = null;

async function getPredictionClient(): Promise<PredictionServiceClient> {
  if (!predictionClient) {
    predictionClient = new PredictionServiceClient({
      apiEndpoint: "us-central1-aiplatform.googleapis.com"
    });
  }
  return predictionClient;
}

// Define proper types for your callable function
interface MenuSuggestionData {
  theme?: string;
}

// Update the PredictionResponse interface
interface PredictionResponse {
  [0]: {
    predictions: Array<{
      structValue: {
        fields: {
          content: {
            stringValue: string;
          };
        };
      };
    }>;
  };
}

export const menuSuggestion = functions.https.onCall<MenuSuggestionData>(
  {
    timeoutSeconds: 60,
    memory: "2GiB"
  },
  async (request) => {
    try {
      const client = await getPredictionClient();
      const theme = request.data?.theme || "seafood";

      const response = (await client.predict({
        endpoint: `projects/${process.env.GCLOUD_PROJECT}/locations/us-central1/publishers/google/models/chat-bison@001`,
        instances: [{
          structValue: {
            fields: {
              prompt: {
                stringValue: JSON.stringify({
                  context: "You are a restaurant menu generator.",
                  messages: [{
                    author: "user",
                    content: `Suggest one menu item for a ${theme} themed restaurant`
                  }]
                })
              }
            }
          }
        }]
      })) as unknown as PredictionResponse;

      if (!response[0]?.predictions?.[0]?.structValue?.fields?.content?.stringValue) {
        throw new Error("Invalid response format from AI service");
      }

      return {
        suggestion: response[0].predictions[0].structValue.fields.content.stringValue
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "AI service error",
        (error as Error).message
      );
    }
  }
);

// Health check endpoint
export const api = functions.https.onRequest(
  (req: functions.https.Request, res: Response) => {
    res.json({ status: "OK" });
  }
);
