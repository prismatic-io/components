import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { generateImageExamplePayload as examplePayload } from "../../examplePayloads/generatedContent";
import { generateImageInputs } from "../../inputs/generatedContent";

export const generateImage = action({
  display: {
    label: "Generate Image",
    description:
      "Generates an image using the Google Generative AI (Gemini) model.",
  },
  inputs: generateImageInputs,
  perform: async (
    context,
    {
      connection,
      model,
      prompt,
      numberOfImages,
      language,
      aspectRatio,
      extraParameters,
    },
  ) => {
    const client = createGeminiClient(connection);
    const data = await client.models.generateImages({
      model,
      prompt,
      config: {
        numberOfImages,
        language,
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
