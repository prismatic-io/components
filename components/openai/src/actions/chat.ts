import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createChatCompletionExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  messagesInput,
  modelInput,
  temperatureInput,
  topPInput,
  timeout,
} from "../inputs";

const createChatCompletion = action({
  display: {
    label: "Create Chat Completion",
    description: "Create a completion for the chat message",
  },
  inputs: {
    connection: connectionInput,
    model: { ...modelInput, default: "gpt-3.5-turbo" },
    messages: messagesInput,
    temperature: temperatureInput,
    topP: topPInput,
    numChoices: input({
      label: "Number of choices",
      type: "string",
      comments:
        "How many chat completion choices to generate for each input message.",
      default: "1",
      required: false,
      clean: util.types.toNumber,
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );
    const { data } = await client.post("/v1/chat/completions", {
      model: params.model,
      messages: params.messages,
      temperature: params.temperature,
      top_p: params.topP,
      n: params.numChoices,
    });
    return { data };
  },
  examplePayload: createChatCompletionExamplePayload,
});

export default { createChatCompletion };
