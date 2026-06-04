import type { GenerateContentResponse } from "@google/genai";







export const sendMessageExamplePayload = {
  data: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Okay, let's break down what 'IA' could mean.",
            },
          ],
          role: "model",
        },
        finishReason: "STOP",
        avgLogprobs: -0.28463075392904913,
      },
    ],
    modelVersion: "gemini-2.5-flash",
    usageMetadata: {
      promptTokenCount: 8,
      candidatesTokenCount: 1285,
      totalTokenCount: 1293,
      promptTokensDetails: [
        {
          modality: "TEXT",
          tokenCount: 8,
        },
      ],
      candidatesTokensDetails: [
        {
          modality: "TEXT",
          tokenCount: 1285,
        },
      ],
    },
  } as GenerateContentResponse,
};
