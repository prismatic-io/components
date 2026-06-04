import { input, util } from "@prismatic-io/spectral";
import {
  cleanCode,
  cleanKeyValueList,
  cleanNumber,
  cleanString,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Gemini connection to use.",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page.",
  example: "10",
  placeholder: "Enter page size",
  clean: cleanNumber,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  comments: "The pagination token from a previous request.",
  example: "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA",
  placeholder: "Enter page token",
  clean: cleanString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "A filter expression to narrow down the results returned by the API.",
  example: "name:gemini-1.5-pro",
  placeholder: "Enter filter expression",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  default: "false",
  clean: util.types.toBool,
});

export const extraParameters = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Additional parameters to include in the request as key-value pairs.",
  example: '{"key": "value"}',
  placeholder: "Enter additional parameters",
  clean: cleanKeyValueList,
});

export const model = input({
  label: "Model Name",
  type: "string",
  required: true,
  comments:
    "The name of the model to get information about (e.g., 'gemini-pro', 'gemini-pro-vision').",
  example: "gemini-pro",
  dataSource: "selectModel",
  clean: util.types.toString,
});

export const prompt = input({
  label: "Prompt",
  type: "string",
  required: true,
  comments: "The text prompt to generate a response for.",
  example: "Write a short story about a robot learning to paint",
  placeholder: "Enter a text prompt",
  clean: util.types.toString,
});

export const temperature = input({
  label: "Temperature",
  type: "string",
  required: false,
  comments:
    "Controls randomness in the output. Higher values (e.g., 0.8) make output more random, lower values (e.g., 0.2) make it more focused and deterministic.",
  example: "0.7",
  placeholder: "Enter temperature value",
  clean: cleanNumber,
});

export const maxOutputTokens = input({
  label: "Max Output Tokens",
  type: "string",
  required: false,
  comments: "Maximum number of tokens to generate in the response.",
  placeholder: "Enter max output tokens",
  example: "1024",
  clean: cleanNumber,
});

export const topK = input({
  label: "Top K",
  type: "string",
  required: false,
  comments: "Limits token selection to the K most likely next tokens.",
  placeholder: "Enter top K value",
  example: "40",
  clean: cleanNumber,
});

export const topP = input({
  label: "Top P",
  type: "string",
  required: false,
  comments:
    "Limits token selection to tokens with cumulative probability less than P.",
  placeholder: "Enter top P value",
  example: "0.95",
  clean: cleanNumber,
});

export const safetySettings = input({
  label: "Safety Settings",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The safety threshold configuration for content generation. Each entry specifies a harm category and its blocking threshold.",
  example: JSON.stringify(
    [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
    null,
    2,
  ),
  placeholder: "Enter safety settings JSON",
  clean: cleanCode,
});


export const conversationId = input({
  label: "Conversation ID",
  type: "string",
  required: false,
  comments:
    "Optional ID to identify this conversation. If not provided, a new conversation will be started.",
  example: "conv_123",
  placeholder: "Enter conversation ID",
  clean: cleanString,
});
