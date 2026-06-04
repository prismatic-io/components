import { input, util } from "@prismatic-io/spectral";
import { DEFAULT_MODEL } from "./constants";
import type { ImageSize } from "./types";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Azure OpenAI Service or OpenAI API connection to use.",
});

export const numImages = input({
  label: "Number of Images",
  type: "string",
  comments: "The number of images to generate. Must be between 1 and 10.",
  required: true,
  default: "1",
  example: "3",
  placeholder: "Enter number of images",
  clean: util.types.toNumber,
});

export const modelInput = input({
  label: "Model / Deployment Name",
  type: "string",
  required: true,
  example: "gpt-4o",
  default: DEFAULT_MODEL,
  placeholder: "Enter model or deployment name",
  clean: util.types.toString,
  dataSource: "selectModel",
  comments:
    "Specifies either the model deployment name (when using Azure OpenAI) or model name (when using OpenAI). See available models at https://platform.openai.com/docs/models.",
});

export const numChoicesInput = input({
  label: "Number of Choices",
  type: "string",
  comments:
    "How many chat completion choices to generate for each input message.",
  default: "1",
  example: "3",
  placeholder: "Enter number of choices",
  required: false,
  clean: util.types.toNumber,
});

export const messagesInput = input({
  label: "Messages",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of message objects with 'role' (system, user, or assistant) and 'content' properties.",
  default: JSON.stringify(
    [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: "Where was it played?" },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const temperatureInput = input({
  label: "Temperature",
  type: "string",
  comments:
    "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
  required: false,
  default: "1",
  example: "0.7",
  placeholder: "Enter temperature",
  clean: util.types.toNumber,
});

export const topPInput = input({
  label: "Top P",
  type: "string",
  comments:
    "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
  required: false,
  default: "1",
  example: "0.9",
  placeholder: "Enter top_p value",
  clean: util.types.toNumber,
});

export const promptInput = input({
  label: "Prompt",
  type: "string",
  comments:
    "A text description of the desired image(s). The maximum length is 1000 characters.",
  required: true,
  placeholder: "Enter image description",
  clean: util.types.toString,
  example: "A cute baby sea otter",
});

export const imageSizeInput = input({
  label: "Image Size",
  type: "string",
  required: false,
  comments:
    "The size of the generated images. Must be one of 1792x1024, 1024x1792, or 1024x1024.",
  default: "1024x1024",
  placeholder: "Select image size",
  model: [
    { label: "1792x1024", value: "1792x1024" },
    { label: "1024x1792", value: "1024x1792" },
    { label: "1024x1024", value: "1024x1024" },
  ],
  clean: (value): ImageSize => util.types.toString(value) as ImageSize,
});
