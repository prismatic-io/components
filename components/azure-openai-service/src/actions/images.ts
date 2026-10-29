import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createImageExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  imageSizeInput,
  modelInput,
  numImages,
  promptInput,
} from "../inputs";
import type { ImageSize } from "../types";

const createImage = action({
  display: {
    label: "Create Image",
    description: "Generate one or more images from a text prompt",
  },
  inputs: {
    connection: connectionInput,
    model: { ...modelInput, default: "dall-e-3", example: "dall-e-3" },
    prompt: promptInput,
    numImages,
    imageSize: imageSizeInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const { data } = await client.images.generate({
      model: params.model,
      prompt: params.prompt,
      n: params.numImages,
      size: params.imageSize ? (params.imageSize as ImageSize) : undefined,
    });
    return { data };
  },
  examplePayload: createImageExamplePayload,
});

export default { createImage };
