import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { generateImageExamplePayload } from "../examplePayloads";
import { generateImageInputs } from "../inputs";

export const generateImage = action({
  display: {
    label: "Generate Image",
    description: "Generate an image using xAI's image generation API",
  },
  inputs: generateImageInputs,
  perform: async (
    context,
    { connection, prompt, n, model, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.createImage({
      prompt,
      n,
      model,
      ...additionalFields,
    });

    return { data };
  },
  examplePayload: generateImageExamplePayload,
});
