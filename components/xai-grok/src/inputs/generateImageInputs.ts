import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber } from "../util";
import { additionalFields, connection } from "./generalInputs";

const prompt = input({
  label: "Prompt",
  type: "string",
  required: true,
  comments: "The text prompt to generate an image from.",
  example: "A serene landscape with mountains and a lake at sunset",
  placeholder: "A serene landscape with mountains and a lake at sunset",
  clean: util.types.toString,
});

const model = input({
  label: "Model",
  type: "string",
  required: true,
  comments: "Model to be used.",
  example: "grok-2-image",
  placeholder: "grok-2-image",
  dataSource: "selectModel",
  clean: util.types.toString,
});

const n = input({
  label: "Number of Images",
  type: "string",
  required: false,
  comments: "Number of images to generate.",
  example: "1",
  placeholder: "1",
  clean: toOptionalNumber,
});

export const generateImageInputs = {
  connection,
  prompt,
  model,
  n,
  additionalFields: {
    ...additionalFields,
    comments:
      additionalFields.comments +
      " See [xAI API docs](https://docs.x.ai/docs/api-reference#image-generations) for possible values.",
    example: JSON.stringify({ user: "user-123" }, null, 2),
  },
};
