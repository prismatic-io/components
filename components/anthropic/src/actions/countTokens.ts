import { action } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { countTokensExamplePayload } from "../examplePayloads/countTokensExamplePayload";
import { countTokensInputs } from "../inputs/countTokensInputs";
import type { CountTokensResponse, Message } from "../interfaces";

export const countTokens = action({
  display: {
    label: "Count Tokens",
    description: "Count the number of tokens in a message or conversation",
  },
  inputs: countTokensInputs,
  perform: async (context, { connection, model, message }) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const messages: Message[] = [{ role: "user", content: message }];

    const { data } = await client.post<CountTokensResponse>(
      "/messages/count_tokens",
      {
        model,
        messages,
      },
    );

    return { data };
  },
  examplePayload: countTokensExamplePayload,
});
