import type {
  GenerateContentResponse,
  GenerateImagesResponse,
  GenerateVideosOperation,
} from "@google/genai";







export const generateTextExamplePayload = {
  data: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "The lighthouse keeper, Silas, was a man of routine.",
            },
          ],
          role: "model",
        },
        finishReason: "STOP",
        avgLogprobs: -0.5446674455915178,
      },
    ],
    modelVersion: "gemini-2.5-flash",
    usageMetadata: {
      promptTokenCount: 6,
      candidatesTokenCount: 525,
      totalTokenCount: 531,
      promptTokensDetails: [
        {
          modality: "TEXT",
          tokenCount: 6,
        },
      ],
      candidatesTokensDetails: [
        {
          modality: "TEXT",
          tokenCount: 525,
        },
      ],
    },
  } as GenerateContentResponse,
};






export const generateImageExamplePayload = {
  data: {
    images: [
      {
        imageBytes:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        mimeType: "image/png",
      },
    ],
    positivePromptSafetyAttributes: {
      blocked: false,
      categories: [],
      scores: [],
    },
  } as GenerateImagesResponse,
};






export const generateVideoExamplePayload = {
  data: {
    done: false,
    name: "operations/generate-video-123",
    response: {
      generatedVideos: [
        {
          video: {
            uri: "https://storage.googleapis.com/generativeai-downloads/videos/sample-output.mp4",
            mimeType: "video/mp4",
          },
        },
      ],
    },
  } as GenerateVideosOperation,
};
