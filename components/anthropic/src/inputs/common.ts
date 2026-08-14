import { input, util } from "@prismatic-io/spectral";
import { DEFAULT_LIMIT, DEFAULT_MODEL, MAX_LIMIT } from "../constants";
import { cleanNumberWithDefault, cleanStringInput } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Anthropic API connection to use.",
});
export const modelInput = input({
  label: "Model",
  type: "string",
  required: true,
  default: DEFAULT_MODEL,
  comments: "The Claude model to use.",
  dataSource: "selectModel",
  clean: util.types.toString,
  placeholder: "Enter a Claude model name",
  example: "claude-sonnet-4-6",
});
export const beforeIdInput = input({
  label: "Before ID",
  type: "string",
  required: false,
  comments:
    "ID of the object to use as a cursor for pagination. Returns the page of results immediately before this object.",
  clean: cleanStringInput,
  placeholder: "Enter a model ID to paginate before",
  example: "claude-sonnet-4-6",
});
export const afterIdInput = input({
  label: "After ID",
  type: "string",
  required: false,
  comments:
    "ID of the object to use as a cursor for pagination. Returns the page of results immediately after this object.",
  clean: cleanStringInput,
  placeholder: "Enter a model ID to paginate after",
  example: "claude-sonnet-4-6",
});
export const limitInput = input({
  label: "Limit",
  type: "string",
  required: false,
  default: util.types.toString(DEFAULT_LIMIT),
  comments: `Number of items to return per page. Defaults to ${DEFAULT_LIMIT}. Range: 1-${MAX_LIMIT}.`,
  clean: cleanNumberWithDefault(DEFAULT_LIMIT),
  placeholder: "Enter number of items per page",
  example: "10",
});
export const fetchAllInput = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results. The Limit, After ID, and Before ID inputs are ignored.",
  clean: util.types.toBool,
});
export const messageInput = input({
  label: "Message",
  type: "string",
  required: true,
  comments: "The message to send in the conversation.",
  clean: util.types.toString,
  placeholder: "Enter a message to Claude",
  example: "What is the capital of France?",
});
