import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createImageExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  imageSizeInput,
  promptInput,
  timeout,
} from "../inputs";

const createImage = action({
  display: {
    label: "Create Image",
    description: "Create image(s) given a prompt",
  },
  inputs: {
    connection: connectionInput,
    prompt: promptInput,
    numImages: input({
      label: "Number of Images",
      type: "string",
      comments: "The number of images to generate. Must be between 1 and 10.",
      required: true,
      default: "1",
      clean: util.types.toNumber,
    }),
    imageSize: imageSizeInput,
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );
    const { data } = await client.post("/v1/images/generations", {
      prompt: params.prompt,
      n: params.numImages,
      size: params.imageSize,
    });
    return { data };
  },
  examplePayload: createImageExamplePayload,
});

export default { createImage };
