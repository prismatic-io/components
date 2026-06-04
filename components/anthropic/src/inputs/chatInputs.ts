import { input, util } from "@prismatic-io/spectral";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../constants";
import { cleanNumberInput, cleanStringInput } from "../utils";
import { connectionInput, messageInput, modelInput } from "./general";

const temperatureInput = input({
  label: "Temperature",
  type: "string",
  required: false,
  default: util.types.toString(DEFAULT_TEMPERATURE),
  comments: `Randomness of the output (0-1, default: ${DEFAULT_TEMPERATURE}).`,
  clean: cleanNumberInput,
  placeholder: "Enter a value between 0 and 1",
  example: "0.7",
});

const systemPromptInput = input({
  label: "System Prompt",
  type: "string",
  required: false,
  comments:
    "Optional system prompt to set the context and behavior for the chat.",
  clean: cleanStringInput,
  placeholder: "Enter a system prompt to guide Claude's behavior",
  example:
    "You are a helpful AI assistant that specializes in answering questions about science.",
});

const maxTokensInput = input({
  label: "Max Tokens",
  type: "string",
  required: false,
  default: util.types.toString(DEFAULT_MAX_TOKENS),
  comments: `Maximum number of tokens to generate (default: ${DEFAULT_MAX_TOKENS}).`,
  clean: cleanNumberInput,
  placeholder: "Enter maximum number of tokens to generate",
  example: "1000",
});

export const chatInputs = {
  connection: connectionInput,
  model: modelInput,
  initialMessage: messageInput,
  systemPrompt: systemPromptInput,
  maxTokens: maxTokensInput,
  temperature: temperatureInput,
};
