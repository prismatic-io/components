import { input, util } from "@prismatic-io/spectral";
import { connection } from "../general";
import {
  cleanOptionalRangeNumber,
  toOptionalObject,
  toOptionalString,
  toOptionalStringValueList,
} from "../../utils";

export const model = input({
  label: "Model",
  comments: "The model to use in order to generate the chat completion.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectModel",
});

export const messages = input({
  label: "Messages",
  comments: "A list of messages comprising the conversation so far.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        role: "system",
        content:
          "You are a helpful assistant that uses tools to retrieve weather data.",
      },
      {
        role: "user",
        content: "What's the weather like in Paris today?",
      },
    ],
    null,
    2
  ),
  clean: util.types.toObject,
});

export const frequencyPenalty = input({
  label: "Frequency Penalty",
  comments:
    "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, " +
    "decreasing the model's likelihood to repeat the same line verbatim.",
  type: "string",
  required: false,
  example: "2",
  placeholder: "2",
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(
      value,
      -2,
      2,
      "Frequency Penalty must be between -2.0 and 2.0"
    ),
});

export const maxTokens = input({
  label: "Max Tokens",
  comments:
    "Integer between 1 and 8192. The maximum number of tokens that can be generated in the chat completion." +
    "The total length of input tokens and generated tokens is limited by the model's context length. If max_tokens is not specified, the default value 4096 is used.",
  type: "string",
  required: false,
  example: "100",
  placeholder: "100",
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(
      value,
      1,
      8192,
      "Max Tokens must be between 1 and 8192"
    ),
});

export const presencePenalty = input({
  label: "Presence Penalty",
  comments:
    "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
  type: "string",
  required: false,
  example: "2",
  placeholder: "2",
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(
      value,
      -2,
      2,
      "Presence Penalty must be between -2.0 and 2.0"
    ),
});

export const responseFormat = input({
  label: "Response Format",
  comments:
    "The format of the response. The response format can be either 'json_object' or 'text'.",
  type: "string",
  required: false,
  example: "json_object",
  placeholder: "json_object",
  clean: toOptionalString,
});

export const stop = input({
  label: "Stop Sequence(s)",
  comments:
    "The stop sequence(s) to use in order to generate the chat completion.",
  type: "string",
  required: false,
  example: "stop1,stop2",
  placeholder: "stop1,stop2",
  collection: "valuelist",
  clean: toOptionalStringValueList,
});

export const stream = input({
  label: "Stream",
  comments:
    "If set, partial message deltas will be sent. Tokens will be sent as data-only server-sent events (SSE) as they become available, with the stream terminated by a data: [DONE] message.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const includeUsage = input({
  label: "Include Usage",
  comments:
    "Only set this when you set stream: When true, an additional chunk will be streamed before the data: [DONE] message. The usage field on this chunk shows the token usage statistics for the entire request, and the choices field will always be an empty array. All other chunks will also include a usage field, but with a null value.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const temperature = input({
  label: "Temperature",
  comments:
    "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. " +
    "[We generally recommend altering this or top_p but not both].",
  type: "string",
  required: false,
  example: "0.5",
  placeholder: "0.5",
  
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(
      value,
      0,
      2,
      "Temperature must be between 0 and 2"
    ),
});

export const topP = input({
  label: "Top P",
  comments:
    "Number between 0 and 1. Higher values like 0.95 will make the output more random, while lower values like 0.05 will make it more focused and deterministic. " +
    "[We generally recommend altering this or temperature but not both].",
  type: "string",
  required: false,
  example: "0.5",
  placeholder: "0.5",
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(value, 0, 1, "Top P must be between 0 and 1"),
});

export const tools = input({
  label: "Tools",
  comments: "The tools to use in order to generate the chat completion.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        type: "function",
        function: {
          name: "getWeather",
          description: "Get current weather for a city",
          parameters: {
            type: "object",
            properties: {
              city: {
                type: "string",
                description: "Name of the city to get weather for",
              },
              units: {
                type: "string",
                enum: ["metric", "imperial"],
                description: "Units for temperature",
              },
            },
            required: ["city"],
          },
        },
      },
    ],
    null,
    2
  ),
  clean: toOptionalObject,
});

export const toolChoice = input({
  label: "Tool Choice",
  comments:
    "Controls which (if any) tool is called by the model." +
    " using 'none' means the model will not call any tool and instead generates a message." +
    " using 'auto' means the model can pick between generating a message or calling one or more tools." +
    " using 'required' means the model must call one or more tools." +
    ' Specifying a particular tool via {type: "function", function: {name: "my_function"}} forces the model to call that tool.' +
    "none is the default when no tools are present. auto is the default if tools are present.",
  type: "string",
  required: false,
  example: "auto",
  placeholder: "auto",
  clean: toOptionalString,
});

export const logProbs = input({
  label: "Should return Log Probabilities",
  comments:
    "Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const topLogProbs = input({
  label: "Top Log Probabilities",
  comments:
    "An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.",
  type: "string",
  required: false,
  example: "10",
  placeholder: "10",
  clean: (value: unknown) =>
    cleanOptionalRangeNumber(
      value,
      0,
      20,
      "Top Log Probabilities must be between 0 and 20"
    ),
});

const createChatCompletionInputs = {
  connection,
  messages,
  model,
  frequence_penalty: frequencyPenalty,
  max_tokens: maxTokens,
  presence_penalty: presencePenalty,
  response_format: responseFormat,
  stop,
  stream,
  include_usage: includeUsage,
  temperature,
  top_p: topP,
  tools,
  tool_choice: toolChoice,
  log_probs: logProbs,
  top_logprobs: topLogProbs,
};

export default createChatCompletionInputs;
