import { input, util } from "@prismatic-io/spectral";
import { additionalFields, connection } from "./generalInputs";

const messages = input({
  label: "Messages",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Input messages. See [xAI API docs](https://docs.x.ai/docs/api-reference#messages-anthropic-compatible) for possible values.",
  example: JSON.stringify([
    {
      role: "user",
      content: "Hello, world",
    },
  ]),
  clean: util.types.toObject,
});

const model = input({
  label: "Model",
  type: "string",
  required: true,
  comments:
    "Model name for the model to use. Obtainable [here](https://docs.x.ai/docs/models).",
  default: "grok-3-fast-latest",
  placeholder: "grok-3-fast-latest",
  dataSource: "selectModel",
  clean: util.types.toString,
});

const maxTokens = input({
  label: "Max Tokens",
  type: "string",
  required: true,
  comments:
    "The maximum number of tokens to generate before stopping. The model may stop before the max_tokens when it reaches the stop sequence.",
  default: "100",
  example: "100",
  placeholder: "100",
  clean: util.types.toNumber,
});

export const createMessageInputs = {
  connection,
  messages,
  model,
  maxTokens,
  additionalFields: {
    ...additionalFields,
    comments:
      additionalFields.comments +
      " See [xAI API docs](https://docs.x.ai/docs/api-reference#messages-anthropic-compatible) for possible values.",
    example: JSON.stringify({ stream: true }, null, 2),
  },
};
