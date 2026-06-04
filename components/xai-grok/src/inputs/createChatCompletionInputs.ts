import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber } from "../util";
import { additionalFields, connection } from "./generalInputs";

const messages = input({
  label: "Messages",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A list of messages that make up the the chat conversation. Different models support different message types, such as image and text.",
  example: JSON.stringify(
    [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const model = input({
  label: "Model",
  type: "string",
  required: true,
  comments:
    "Model name for the model to use. Obtainable [here](https://docs.x.ai/docs/models).",
  example: "grok-2-latest",
  placeholder: "grok-2-latest",
  dataSource: "selectModel",
  clean: util.types.toString,
});

const temperature = input({
  label: "Temperature",
  type: "string",
  required: false,
  comments:
    "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
  default: "1",
  placeholder: "1",
  example: "1",
  clean: toOptionalNumber,
});

const topP = input({
  label: "Top P",
  type: "string",
  required: false,
  comments:
    "An alternative to sampling with `Temperature`, called nucleus sampling, where the model considers the results of the tokens with `Top P` probability mass. It is generally recommended to alter this or `Temperature` but not both.",
  default: "1",
  placeholder: "1",
  example: "1",
  clean: toOptionalNumber,
});

const stream = input({
  label: "Stream",
  type: "boolean",
  required: false,
  comments: "If set, partial message deltas will be sent.",
  default: "false",
  clean: util.types.toBool,
});

export const createChatCompletionInputs = {
  connection,
  model,
  messages,
  temperature,
  topP,
  stream,
  additionalFields: {
    ...additionalFields,
    comments:
      additionalFields.comments +
      " See [xAI API docs](https://docs.x.ai/docs/api-reference#chat-completions) for possible values.",
    example: JSON.stringify({ reasoning_effort: "low" }, null, 2),
  },
};
