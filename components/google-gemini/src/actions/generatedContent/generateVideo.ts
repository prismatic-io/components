import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { generateVideoExamplePayload as examplePayload } from "../../examplePayloads/generatedContent";
import { generateVideoInputs } from "../../inputs/generatedContent";
export const generateVideo = action({
  display: {
    label: "Generate Video",
    description:
      "Generates a video using the Google Generative AI (Gemini) model.",
  },
  inputs: generateVideoInputs,
  perform: async (
    context,
    {
      connection,
      model,
      prompt,
      videoSettings: {
        fps,
        numberOfVideos,
        personGeneration,
        resolution,
        aspectRatio,
        durationSeconds,
      },
      extraParameters,
    },
  ) => {
    const client = createGeminiClient(connection);
    const data = await client.models.generateVideos({
      model,
      prompt,
      config: {
        fps,
        numberOfVideos,
        personGeneration,
        resolution,
        durationSeconds,
        aspectRatio,
        ...extraParameters,
      },
    });
    return {
      data,
    };
  },
  examplePayload,
});
