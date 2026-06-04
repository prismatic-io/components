import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createChatCompletionExamplePayload } from "../examplePayloads";
import { createChatCompletionInputs } from "../inputs";
import type { IChatCompletionParams } from "../interfaces";

export const createChatCompletion = action({
  display: {
    label: "Create Chat Completion",
    description: "Create a chat completion using xAI Grok",
  },
  inputs: createChatCompletionInputs,
  perform: async (
    context,
    {
      connection,
      model,
      messages,
      temperature,
      topP,
      stream,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const messagesArray = messages as IChatCompletionParams["messages"];

    const data = await client.createChatCompletion({
      model,
      messages: messagesArray,
      temperature,
      top_p: topP,
      stream,
      ...additionalFields,
    });

    return { data };
  },
  examplePayload: createChatCompletionExamplePayload,
});
