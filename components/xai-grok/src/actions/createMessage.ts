import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createMessageExamplePayload } from "../examplePayloads";
import { createMessageInputs } from "../inputs";
import type { IMessage } from "../interfaces/IMessage";

export const createMessage = action({
  display: {
    label: "Create Message",
    description:
      "Create a message using the Anthropic-compatible messages API endpoint",
  },
  inputs: createMessageInputs,
  perform: async (
    context,
    { connection, messages, model, maxTokens, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const response = await client.createMessage({
      messages: messages as IMessage[],
      model,
      max_tokens: maxTokens,
      ...additionalFields,
    });

    return {
      data: response,
    };
  },
  examplePayload: createMessageExamplePayload,
});
