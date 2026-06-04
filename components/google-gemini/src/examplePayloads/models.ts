import type { Model } from "@google/genai";







export const getModelInfoExamplePayload = {
  data: {
    name: "models/gemini-2.5-flash",
    displayName: "Gemini 2.5 Flash",
    description: "Gemini 2.5 Flash",
    version: "2.0",
    tunedModelInfo: {},
    inputTokenLimit: 1048576,
    outputTokenLimit: 8192,
    supportedActions: [
      "generateContent",
      "countTokens",
      "createCachedContent",
      "batchGenerateContent",
    ],
  } as Model,
};







export const listModelsExamplePayload = {
  data: [getModelInfoExamplePayload.data],
};
