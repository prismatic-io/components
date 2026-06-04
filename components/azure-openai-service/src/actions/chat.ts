import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createChatCompletionExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  messagesInput,
  modelInput,
  numChoicesInput,
  temperatureInput,
  topPInput,
} from "../inputs";

const createChatCompletion = action({
  display: {
    label: "Create Chat Completion",
    description: "Create a chat completion for a sequence of messages",
  },
  inputs: {
    connection: connectionInput,
    model: modelInput,
    messages: messagesInput,
    temperature: temperatureInput,
    topP: topPInput,
    numChoices: numChoicesInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const data = await client.chat.completions.create({
      model: params.model,
      messages: params.messages as [],
      temperature: params.temperature || undefined,
      top_p: params.topP || undefined,
      n: params.numChoices || undefined,
    });
    return { data };
  },
  examplePayload: createChatCompletionExamplePayload,
});

export default { createChatCompletion };
